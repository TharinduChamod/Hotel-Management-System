import * as React from "react";
import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function Hero() {
  return (
    // Hero Background Settings
    <Box
      id="home"
      sx={(theme) => ({
        width: "100%",
        backgroundImage:
          theme.palette.mode === "light"
            ? "linear-gradient(180deg, #CEE5FD, #FFF)"
            : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={6} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
          {/* Hotel Name in the landing page */}
          <Typography
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
              fontSize: "clamp(3.5rem, 10vw, 4rem)",
            }}
          >
            B2&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: "clamp(3rem, 10vw, 4rem)",
                color: (theme) =>
                  theme.palette.mode === "light"
                    ? "primary.main"
                    : "primary.light",
              }}
            >
              Hotel Complex
            </Typography>
          </Typography>

          <Typography
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              color: "primary.main",
              fontFamily: "Times New Roman",
            }}
          >
            Enjoy with various foods for your budget in Kurunegala !
          </Typography>

          {/* About Paragraph of the Hotel */}
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{
              alignSelf: "center",
              width: { sm: "100%", md: "80%" },
              fontSize: "1.2rem",
            }}
          >
            Immerse yourself in a world of culinary delights at B2 Hotel
            Complex. Our chefs use only the freshest, seasonal ingredients to
            craft authentic Sri Lankan dishes that will tantalize your taste
            buds. Whether you're seeking a romantic evening, a celebratory
            gathering, or a casual night out, our warm hospitality and beautiful
            setting will create an unforgettable dining experience. Explore our
            diverse menu, brimming with options to please every palate, and
            discover the B2 Hotel Complex difference. Reserve your table today
            and embark on a delightful escape from the ordinary.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
