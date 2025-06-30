// src/pages/CheckoutPage.tsx
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Box, Button, Typography, Container, TextField } from "@mui/material";
import { useAppSelector } from "src/store";

export const CheckoutPage = () => {
  const navigate = useNavigate();
    const { id } = useParams();
const products = useAppSelector((state) => state.product.list.data);

const flatProducts =
  products?.products?.flatMap((group: any) => group.items) || [];

const product = flatProducts.find((p: any) => p.objectID === id);


  if (!product) {
    return (
      <Container sx={{ pt: 10 }}>
        <Typography variant="h6">No product found.</Typography>
        <Button onClick={() => navigate("/")}>Go Home</Button>
      </Container>
    );
  }

  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
    navigate("/"); // or show order confirmation page
  };

  return (
    <Container maxWidth="sm" sx={{ pt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      <Typography variant="h6">{product.name}</Typography>
      <Typography color="primary">₹{product.salePrice}</Typography>

      <Box sx={{ mt: 4 }}>
        <TextField
          fullWidth
          label="Shipping Address"
          placeholder="Enter your address"
          multiline
          rows={4}
        />
      </Box>

      <Box mt={3}>
        <Button variant="contained" onClick={handlePlaceOrder}>
          Confirm Order
        </Button>
      </Box>
    </Container>
  );
};
