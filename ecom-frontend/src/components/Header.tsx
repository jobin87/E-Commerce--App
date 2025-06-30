import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Button,
  Container,
  Badge,
} from "@mui/material";
import {
  ShoppingCart,
  Menu as MenuIcon,
  DarkMode,
  LightMode,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../theme/ThemeContext"; // or adjust path
import { paths } from "src/routes/paths";
import { useAppDispatch } from "src/store";

const pages = ["Products", "Categories"];

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleproduct = () => navigate(paths.dashboard.product.root);
  const handlecart = () => navigate(paths.dashboard.product.cart);

  const handlePageClick = (pages: string) => {
  switch (pages) {
    case "Products":
      navigate(paths.dashboard.product.root); // if you're using react-router
      break;
    case "Categories":
      navigate(paths.dashboard.product.root);
      break;
   
    default:
      console.log("Clicked:", pages);
  }
};


  return (
    <AppBar position="fixed" color="primary" sx={{ zIndex: 1201 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo for md+ */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              color: "inherit",
              textDecoration: "none",
              fontWeight: 700,
              letterSpacing: ".2rem",
              fontFamily: "monospace",
            }}
          >
            BuyinMatrix
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="open menu"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} 
    onClick={() => {
      handleCloseNavMenu();
      handlePageClick(page); // ✅ Now correctly calls with the clicked page
    }}>
                  <Typography
                    component={Button}
                    sx={{ textDecoration: "none", color: "inherit" }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo for xs */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              color: "inherit",
              textDecoration: "none",
              fontWeight: 700,
              letterSpacing: ".2rem",
              fontFamily: "monospace",
            }}
          >
            ShopinMatrix
          </Typography>

          {/* Desktop nav */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleproduct}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Right Side Icons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton color="inherit" onClick={handlecart}>
              {/* Uncomment below if you want a count */}
              {/* <Badge badgeContent={3} color="error"> */}
              <ShoppingCart />
              {/* </Badge> */}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
