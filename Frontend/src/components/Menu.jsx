import React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Typography, Box } from "@mui/material";
import MenuItem from "../components/MenuItem";
import { MenuData } from "../data/Menu_Data";

function Menu() {
  return (
    <Box
      id="menu"
      sx={{
        width: "100%",
        mb: "10rem",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          pt: { xs: 10, sm: 12 },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignSelf: "center",
            textAlign: "center",
            fontSize: "clamp(3.5rem, 5vw, 4rem)",
          }}
        >
          Our&nbsp;
          <Typography
            component="span"
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
              fontSize: "clamp(3.5rem, 5vw, 4rem)",
              color: "primary.main",
            }}
          >
            Menu
          </Typography>
        </Typography>

        {/* Menu Divider*/}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            pt: { xs: 4, sm: 8 },
            width: "100%",
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        ></Box>

        {/* Custom Heading for Describe the menu */}
        <Typography
          component="span"
          variant="h5"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignSelf: "center",
            textAlign: "center",
            fontFamily: "Times New Roman",
            letterSpacing: "0.5rem",
            backgroundColor: "yellow",
            padding: "1rem",
            borderRadius: "2rem",
            "&:hover": {
              fontSize: "2rem",
              border: "1px solid",
              borderRadius: "2rem",
              borderColor: "primary.main",
              padding: "0.5rem",
            },
          }}
        >
          The Classics we Love 😍
        </Typography>

        {/* Grid container for adding menu items */}
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 5 }}
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          {MenuData.map((item, index) => (
            <Grid key={index} item>
              <MenuItem key={index} {...item}></MenuItem>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Menu;
