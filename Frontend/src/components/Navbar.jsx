import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import logo from "../assets/restaurant-logo.png";
import { logoStyle } from "../data/Navbar_Data";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  // Get Navigation
  const navigate = useNavigate();
  // States for managing the state of the dropdown menu
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Function to goto the sections in the landing Page
  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 10;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    // Setting the position of the App bar to the static and transparent Background Color
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: 2,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          variant="regular"
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            borderRadius: "50px",
            bgcolor:
              theme.palette.mode === "light"
                ? "rgba(255, 255, 255, 0.4)"
                : "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(24px)",
            maxHeight: 40,
            border: "1px solid",
            borderColor: "divider",
            boxShadow:
              theme.palette.mode === "light"
                ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
          })}
        >
          {/* Logo of the Hotel  */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              marginLeft: "2rem",
              marginRight: "3rem",
            }}
          >
            <img src={logo} style={logoStyle} alt="logo of B2" />
          </Box>

          {/* Navbar content pages buttons, Home and about can be added in to the same page - Small screens*/}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="text.primary"
            >
              <MenuIcon />
            </IconButton>

            {/* Mapping the dropdown menu items */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                key="home-dropdown"
                onClick={() => {
                  navigate("/");
                }}
              >
                <Typography
                  textAlign="center"
                  sx={{
                    my: 2,
                    mx: 1.5,
                    color: "text.primary",
                    display: "block",
                    fontFamily: "arial",
                    fontSize: "1rem",
                  }}
                >
                  Home
                </Typography>
              </MenuItem>

              <MenuItem
                key="menu-dropdown"
                onClick={() => {
                  navigate("/menu");
                }}
              >
                <Typography
                  textAlign="center"
                  sx={{
                    my: 2,
                    mx: 1.5,
                    color: "text.primary",
                    display: "block",
                    fontFamily: "arial",
                    fontSize: "1rem",
                  }}
                >
                  Menu
                </Typography>
              </MenuItem>

              <MenuItem
                key="about-dropdown"
                onClick={() => {
                  navigate("/about");
                }}
              >
                <Typography
                  textAlign="center"
                  sx={{
                    my: 2,
                    mx: 1.5,
                    color: "text.primary",
                    display: "block",
                    fontFamily: "arial",
                    fontSize: "1rem",
                  }}
                >
                  About Us
                </Typography>
              </MenuItem>

              <MenuItem
                key="dashboard-dropdown"
                onClick={() => {
                  navigate("/login");
                }}
              >
                <Typography
                  textAlign="center"
                  sx={{
                    my: 2,
                    mx: 1.5,
                    color: "text.primary",
                    display: "block",
                    fontFamily: "arial",
                    fontSize: "1rem",
                  }}
                >
                  Dashboard
                </Typography>
              </MenuItem>
            </Menu>
          </Box>

          {/* This is for adding logo after adding dropdown menu - Small screens*/}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              px: 5,
            }}
          >
            <img src={logo} style={logoStyle} alt="logo of B2" />
          </Box>

          {/* Mapping the pages in the navbar - Default screen size*/}
          {/* Buttons for go to different sections/pages */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            <Button
              key="home"
              onClick={() => {
                navigate("/");
              }}
              sx={{
                my: 2,
                mx: 1.5,
                color: "text.secondary",
                display: "block",
                fontFamily: "sans-serif",
                fontSize: "1.3rem",
                fontWeight: "500",
              }}
            >
              Home
            </Button>

            <Button
              key="menu"
              onClick={() => {
                navigate("/menu");
              }}
              sx={{
                my: 2,
                mx: 1.5,
                color: "text.secondary",
                display: "block",
                fontFamily: "sans-serif",
                fontSize: "1.3rem",
                fontWeight: "500",
              }}
            >
              Menu
            </Button>

            <Button
              key="about"
              onClick={() => {
                navigate("/about");
              }}
              sx={{
                my: 2,
                mx: 1.5,
                color: "text.secondary",
                display: "block",
                fontFamily: "sans-serif",
                fontSize: "1.3rem",
                fontWeight: "500",
              }}
            >
              About Us
            </Button>

            {/* Navigation should be added to the Dashboard Login Page */}
            <Button
              key="dashboard"
              onClick={() => {
                navigate("/login");
              }}
              sx={{
                my: 2,
                mx: 1.5,
                color: "text.secondary",
                display: "block",
                fontFamily: "sans-serif",
                fontSize: "1.3rem",
                fontWeight: "500",
              }}
            >
              DashBoard
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
