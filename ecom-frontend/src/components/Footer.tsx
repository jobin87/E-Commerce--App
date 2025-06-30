import React from "react";
import {
  Box,
  Container,
  Link,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import {
  Facebook,
  GitHub,
  Instagram,
  LinkedIn,
  Pinterest,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: "#f7f7f7", py: 4, mt: 5 }}>
      <Container maxWidth="lg" sx={{ overflowX: "hidden" }}>
        {/* Navigation Links */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{
            mb: 3,
            flexWrap: "wrap",
            maxWidth: "100%",
            textAlign: "center",
          }}
        >
          <NavLink
            to=""
            style={{
              textDecoration: "none",
              color: "#333",
              whiteSpace: "nowrap",
            }}
          >
            About us @matrixsec
          </NavLink>
          <NavLink
            to=""
            style={{
              textDecoration: "none",
              color: "#333",
              whiteSpace: "nowrap",
            }}
          >
            Our commitments
          </NavLink>
          <NavLink
            to=""
            style={{
              textDecoration: "none",
              color: "#333",
              whiteSpace: "nowrap",
            }}
          >
            Join us
          </NavLink>
          <NavLink
            to=""
            style={{
              textDecoration: "none",
              color: "#333",
              whiteSpace: "nowrap",
            }}
          >
            Newsletter
          </NavLink>
        </Stack>

        {/* Social Icons */}
        <Stack
          direction="row"
          justifyContent="center"
          spacing={2}
          sx={{ mb: 3, flexWrap: "wrap" }}
        >
          <IconButton
            component="a"
            href="https://www.facebook.com/"
            target="_blank"
            sx={{ width: 40, height: 40 }}
          >
            <Facebook />
          </IconButton>
          <IconButton
            component="a"
            href="https://youtube.com/"
            target="_blank"
            sx={{ width: 40, height: 40 }}
          >
            <YouTube />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.instagram.com"
            target="_blank"
            sx={{ width: 40, height: 40 }}
          >
            <Instagram />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.pinterest.com/"
            target="_blank"
            sx={{ width: 40, height: 40 }}
          >
            <Pinterest />
          </IconButton>
          <IconButton
            component="a"
            href="https://github.com/SamAddy"
            target="_blank"
            sx={{ width: 40, height: 40 }}
          >
            <GitHub />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.linkedin.com/in/samuel-k-addison/"
            target="_blank"
            sx={{ width: 40, height: 40 }}
          >
            <LinkedIn />
          </IconButton>
          <IconButton
            component="a"
            href="https://twitter.com/prof_addy"
            target="_blank"
            sx={{ width: 40, height: 40 }}
          >
            <Twitter />
          </IconButton>
        </Stack>

        {/* Copyright */}
        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          sx={{ px: 2, overflowWrap: "anywhere" }}
        >
          © {new Date().getFullYear()}{" "}
          <Link
            href="https://samaddy.github.io/"
            underline="hover"
            target="_blank"
          >
            MatrixSec
          </Link>
          . All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
