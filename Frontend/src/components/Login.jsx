import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import LoginIcon from "@mui/icons-material/Login";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { Grid } from "@mui/material";
import axios from "axios";
import Alert from "@mui/material/Alert";

// /Function to add copyrights
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        B2 Hotel Complex
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Login() {
  // State to store password visbility
  const [showPassword, setShowPassword] = useState(false);

  // Set states for get data and error
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Handel input changes from the input element change event
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  // Set toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // This function hadndle the Login Logic
  const handleSubmit = async (e) => {
    // Prevent Refreshing the page
    e.preventDefault();

    // Try to get the data from Auth API
    try {
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/dashboard";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <Box id="login">
      <Container component="main" maxWidth="sm">
        {/* Box which login is contained */}
        <Box
          sx={{
            marginTop: "6rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "2px solid",
            p: "2rem",
            borderRadius: "1rem",
            borderColor: "divider",
            bgcolor: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(24px)",
          }}
        >
          {/* Login Avatar */}
          <Avatar sx={{ m: 1 }}>
            <LoginIcon />
          </Avatar>

          {/* Login Title */}
          <Typography
            component="h1"
            variant="h5"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
            }}
          >
            Login to the&nbsp;
            <Typography
              component="span"
              variant="h5"
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignSelf: "center",
                textAlign: "center",
                color: "primary.main",
              }}
            >
              Dashboard
            </Typography>
          </Typography>

          {/* Form Box for entering login Details */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              value={data.email}
              onChange={handleChange}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={data.password}
              onChange={handleChange}
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              //   Password toggle button
              InputProps={{
                endAdornment: (
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                ),
              }}
            />

            {/* Error message */}
            {error && (
              <Alert severity="error" sx={{ marginTop: "1rem" }}>
                {error}
              </Alert>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              LOGIN
            </Button>

            {/* Rediirect to the signup page */}
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/signup" variant="body2">
                  Are you a new manager? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </Box>
  );
}
