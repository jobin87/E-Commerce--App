import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Button,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getProducts } from "src/store/product/productThunk";
import { productObjectId, productTypes } from "src/store/product/types";
import { addCart } from "src/store/cart/cartThunk";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "src/store";
import { paths } from "src/routes/paths";

export const ProductDetailPage = () => {
  const { id } = useParams(); // expects the route to be /product/:id
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<productTypes | null>(null);
  const {
    loading,
   data,
}: {
  loading: boolean;
  data: { products: { category: string; items: productTypes[] }[] }} = useAppSelector(
    (state) => state.product.list
  );
  console.log("data:", data);

  useEffect(() => {
    if (!data?.products?.length) {
      dispatch(getProducts());
    } else {
      findProductById();
    }
  }, [data]);

 const findProductById = () => {
  const flatProducts = data.products.flatMap((group) => group.items);
  const match = flatProducts.find((p) => p.objectID === id);
  setProduct(match || null);
};

  const handleAddToCart = () => {
    if (product) {
      dispatch(addCart({ objectID: product.objectID }) as any); // 👈 correct object
      toast.success("Added to cart!");
    }
  };

  const handlebuyNow = () => {
    console.log("product:", product);
    navigate(paths.dashboard.product.checkout(product.objectID));
  };

  if (loading || !product) {
    return (
      <Container sx={{ pt: 10 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ pt: 10 }}>
      <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={4}>
        <Box flex={1}>
          <img
            src={product.image?.replace("http://", "https://")}
            alt={product.name}
            style={{ width: "100%", objectFit: "contain", borderRadius: 8 }}
          />
        </Box>
        <Box flex={2}>
          <Typography variant="h5" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {/* Category: {product.categories?.join(", ")} */}
          </Typography>
          <Typography variant="h6" color="primary" gutterBottom>
            ₹{product.salePrice}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {product.shortDescription || "No description available."}
          </Typography>

          <Box display="flex" gap={2}>
            <Button variant="contained" onClick={handleAddToCart}>
              Add to Cart
            </Button>

            <Button variant="outlined" onClick={handlebuyNow}>
              Buy Now
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
