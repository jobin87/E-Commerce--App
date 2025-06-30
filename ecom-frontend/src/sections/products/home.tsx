import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  MenuItem,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { getProducts } from "src/store/product/productThunk";
import { paths } from "src/routes/paths";
import toast from "react-hot-toast";
import { addCart } from "src/store/cart/cartThunk";
import { productTypes } from "src/store/product/types";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/store";

const PRODUCTS_PER_PAGE = 12;

const sortingOptions = [
  { id: "priceAsc", label: "Price: Low to High" },
  { id: "priceDesc", label: "Price: High to Low" },
  { id: "nameAsc", label: "Name A-Z" },
  { id: "nameDesc", label: "Name Z-A" },
];

export const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    loading,
    data,
  }: { loading: boolean; data: { products: productTypes[] } } = useAppSelector(
    (state: any) => state.product.list
  );
  const groupedData = data?.products || [];

  const [sortBy, setSortBy] = useState("priceAsc");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!data || data?.products?.length === 0) {
      dispatch(getProducts()as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddToCart = async (product: productTypes) => {
    try {
      const response = dispatch(addCart(product) as any);
      if (response.payload) {
        toast.success("Product added to cart");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNavigate = (id: string) => {
    navigate(paths.dashboard.product.details(id)); // Assuming function-style path
  };

  const handlebuyNow = (id: string) => {
    navigate(paths.dashboard.product.checkout(id));
  };

  const handleSort = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortBy(e.target.value);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const productsByCategory = groupedData.map((group: any) => {
    const filteredItems = group.items
      .filter((product: any) =>
        (product.name || "").toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a: any, b: any) => {
        if (sortBy === "priceAsc") return a.salePrice - b.salePrice;
        if (sortBy === "priceDesc") return b.salePrice - a.salePrice;
        if (sortBy === "nameAsc") return a.name.localeCompare(b.name);
        if (sortBy === "nameDesc") return b.name.localeCompare(a.name);
        return 0;
      });

    return {
      category: group.category,
      items: filteredItems,
    };
  });
  return (
    <Container maxWidth="xl" sx={{ pt: { xs: 10, sm: 12 }, pb: 6 }}>
      {/* Filter Controls */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          mb: 3,
          maxWidth: { xs: "90%", sm: "60%" },
          mx: "auto",
        }}
      >
        <TextField
          size="small"
          select
          label="Sort By"
          value={sortBy}
          onChange={handleSort}
          fullWidth
        >
          {sortingOptions.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          size="small"
          fullWidth
          placeholder="Search by name"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Box>

      {/* Product Display */}
      {loading ? (
        <Typography align="center">Loading...</Typography>
      ) : productsByCategory.every((group: any) => group.items.length === 0) ? (
        <Typography align="center">No products found</Typography>
      ) : (
        <>
          {productsByCategory.map(
            (group: any) =>
              group.items.length > 0 && (
                <Box key={group.category} sx={{ mb: 5 }}>
                  <Typography variant="h6" gutterBottom>
                    {group.category}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      overflowX: "auto",
                      gap: 2,
                      py: 2,
                      px: 1,
                      scrollSnapType: "x mandatory",
                      "&::-webkit-scrollbar": { display: "none" },
                    }}
                  >
                    {group.items
                      .slice(0, PRODUCTS_PER_PAGE)
                      .map((product: productTypes) => (
                        <Box
                          key={product.objectID || product.name}
                          sx={{ flex: "0 0 auto", scrollSnapAlign: "start" }}
                        >
                          <Card
                            sx={{
                              height: 200,
                              width: 200,
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                              bgcolor: "#fefefe",
                            }}
                          >
                            <CardContent>
                              <Box
                                sx={{
                                  width: "100%",
                                  height: 60,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  overflow: "hidden",
                                  mb: 1,
                                }}
                              >
                                <img
                                  src={product.image?.replace(
                                    "http://",
                                    "https://"
                                  )}
                                  alt={product.name}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                  }}
                                />
                              </Box>

                              <Typography
                                variant="subtitle2"
                                onClick={() => handleNavigate(product.objectID)}
                                noWrap
                                title={product.name}
                                sx={{
                                  maxWidth: 300,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  mb: 1,
                                  textDecoration: "underline",
                                }}
                              >
                                {product.name}
                              </Typography>

                              <Typography
                                color="text.secondary"
                                fontSize="11px"
                              >
                                ₹{product.salePrice}
                              </Typography>

                              <Box
                                sx={{
                                  display: "flex",
                                  gap: 1,
                                  justifyContent: "space-between",
                                  mt: 1,
                                }}
                              >
                                <Button
                                  size="small"
                                  variant="contained"
                                  onClick={() => handlebuyNow(product.objectID)} // ✅ Correct
                                  sx={{
                                    minWidth: 60,
                                    padding: "2px 6px",
                                    fontSize: "0.6rem",
                                  }}
                                >
                                  Buy
                                </Button>

                                <Button
                                  size="small"
                                  variant="outlined"
                                  onClick={() => handleAddToCart(product)}
                                  sx={{
                                    minWidth: 60,
                                    padding: "2px 6px",
                                    fontSize: "0.6rem",
                                  }}
                                >
                                  Cart
                                </Button>
                              </Box>
                            </CardContent>
                          </Card>
                        </Box>
                      ))}
                  </Box>
                </Box>
              )
          )}
        </>
      )}
    </Container>
  );
};
