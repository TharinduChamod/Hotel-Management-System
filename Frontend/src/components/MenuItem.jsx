import React from "react";
import Grid from "@mui/material/Grid";
import { Typography, Box } from "@mui/material";
import { Card, CardContent, Stack, Chip } from "@mui/material";
import { imageSize } from "../data/MenuItem_Data";

// Return the menu item componenet
const MenuItem = ({ category, imagePath, items }) => {
  return (
    <Card
      sx={{
        width: "100%",
        boxShadow: "0 0 20px 0 rgba(0,0,0,0.12)",
        borderRadius: "1rem",
      }}
    >
      <CardContent
        sx={{ backgroundImage: "linear-gradient(180deg, #CEE5FD, #FFF)" }}
      >
        {/* Ordering in a stack */}
        <Stack spacing={2}>
          <Box sx={{ alignContent: "center", justifyItems: "center" }}>
            {/* Title Of the Card - Name of the food category */}
            <Typography
              variant="h3"
              sx={{
                flexDirection: { xs: "column", md: "row" },
                alignSelf: "center",
                textAlign: "center",
                color: "text.primary",
                fontFamily: "Times New Roman",
                letterSpacing: "1rem",
              }}
            >
              {category}
            </Typography>

            {/* Image */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              {/* A photo of menu item should be added */}
              <img src={imagePath} style={imageSize} alt="Menu Image"></img>
            </Box>

            {/* Menu Items are in Grid Layout*/}
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
              {/* Mapping the menu items of the single cuisine */}
              {items.map((item, index) => (
                <Grid key={index} item xs={3}>
                  <Card
                    sx={{
                      boxShadow: "0 0 20px 0 rgba(0,0,0,0.12)",
                      borderRadius: "1rem",
                    }}
                  >
                    {/* Card For every single menu item */}
                    <CardContent>
                      {/* Show Name of the Menu Item */}
                      <Typography
                        sx={{
                          fontFamily: "Times New Roman",
                          fontSize: "1.3rem",
                          marginBottom: "1rem",
                        }}
                      >
                        {item.name}
                      </Typography>

                      {/* Shows Price of the Menu Item */}
                      <Chip
                        variant="outlined"
                        color="success"
                        label={`Rs ${item.price}.00`}
                        sx={{ fontSize: "1.2rem" }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default MenuItem;
