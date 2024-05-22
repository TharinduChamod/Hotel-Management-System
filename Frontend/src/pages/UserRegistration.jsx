import React from "react";
import ResponsiveDrawer from "../components/SideBar";
import { Box, Divider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import SignUp from "../components/SignUp";
import Navbar from "../components/Navbar";

const drawerWidth = 260;

function UserRegistration() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        {/* Side Menu Attaches to this */}
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="responsive drawer"
        >
          <ResponsiveDrawer />
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            px: 3,
            paddingTop: "1rem",
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          {/* Dashboard Welcome text */}
          <Typography
            variant="h4"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              marginTop: "1rem",
              marginBottom: "1rem",
              alignSelf: "center",
              textAlign: "center",
              color: "text.secondary",
              justifyContent: "center",
            }}
          >
            User Registration - Administrative Dashboard
          </Typography>

          <Divider sx={{ marginTop: "2rem" }}></Divider>

          <Box>
            <SignUp></SignUp>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default UserRegistration;
