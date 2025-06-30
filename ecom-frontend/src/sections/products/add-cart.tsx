import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

import { getCart } from "src/store/cart/cartThunk";
import { Grid3x3 } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "src/store";

export const CartPage = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(
    (state) => state.cart.cartUpdation.data || []
  );
  console.log("cartItems:", cartItems);

  useEffect(() => {
    console.log("🚀 dispatching getCart()");
    dispatch(getCart() as any);
  }, [dispatch]);

  return (
    <div>
      <Typography mt={10} variant="h4"  mb={5}>
        Shopping Cart
      </Typography>

      <>
        {Array.isArray(cartItems?.data) && cartItems.data.length > 0 ? (
          <Grid container spacing={3}>
            {cartItems.data.map((item: any) => (
              <Grid item xs={12} sm={6} md={3} lg={3} key={item.objectID}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Product Image */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Box sx={{ width: 100, height: 100 }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          display: "block",
                        }}
                      />
                    </Box>
                  </Box>
                  <Box>
                    <Divider />
                    {/* Product Name */}
                    <Typography
                      variant="subtitle2"
                      noWrap
                      title={item.name}
                      sx={{
                        maxWidth: 300,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        ml: 2,
                        mb: 1,
                      }}
                    >
                      {item.name}
                    </Typography>

                    {/* Sale Price */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: "primary.main",
                        fontWeight: "bold",
                        mb: 1,
                        ml: 2,
                      }}
                    >
                      Price:₹{item.salePrice}
                    </Typography>

                    {/* Quantity */}
                    <Box sx={{ display: "flex" }}>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", ml: 2 }}
                      >
                        Quantity: <strong>{item.quantity}</strong>
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          ml:3,
                          gap:1,
                          mb:3
                        }}
                      >
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{
                            minWidth: 24,
                            height: 24,
                            padding: 0,
                            lineHeight: 1,
                          }}
                        >
                          <Box
                            component="span"
                            sx={{ fontSize: "20px"}}
                          >
                            +
                          </Box>
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{
                            minWidth: 24,
                            height: 24,
                            padding: 0,
                            lineHeight: 1,
                          }}
                        >
                          <Box
                            component="span"
                            sx={{ fontSize: "20px"}}
                          >
                            −
                          </Box>
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" align="center" mt={5}>
            Your cart is empty.
          </Typography>
        )}

        <Box textAlign="center" mt={2}>
          <Button variant="contained" color="primary">
            Save Changes
          </Button>
        </Box>

        <Box textAlign="center" mt={2}>
          <Button variant="text" color="secondary">
            Clear Cart
          </Button>
        </Box>
      </>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
