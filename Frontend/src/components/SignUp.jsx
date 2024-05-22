import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LoginIcon from "@mui/icons-material/Login";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "@mui/material/Alert";

// For Toast message
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// TODO: Add this inside the dashboard (Therefore only manager can add users to the system)

// Copyrights Functions
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
        B2 hotel Complex
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// Function to add toast
const showToastMessage = () => {
  toast.success("User Created Successfully !", {
    position: toast.POSITION.TOP_RIGHT,
  });
};

// Handle Sign up
export default function SignUp() {
  // State to store password visbility
  const [showPassword, setShowPassword] = useState(false);

  // State to set Error and Error Handling
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Navigation Hook to Navigate to the Page
  const navigate = useNavigate();

  // Create State for storing registration Data
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // Handle Input Changes and set the state
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  // Set toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle the submit button action
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a data object from form data (This is not required as we get data from state)
    // const formData = new FormData(event.currentTarget);

    // Uncomment this for debugging purposes
    // console.log({
    //   email: data.email,
    //   password: data.password,
    //   data,
    try {
      // API route of the user registration
      const url = "http://localhost:8080/api/users";

      // Post the data to the URL and wait for the request
      const { data: res } = await axios.post(url, data);

      // Navigate if all is good
      navigate("/login");

      // Console log response
      setMessage(res.message);
      console.log(res.message);
    } catch (error) {
      // If error occured set error
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        // console.log.apply(error);
      }
    }
    // });
  };

  return (
    <Box id="signup">
      <Container component="main" maxWidth="sm">
        {/* Box which is sign in contains */}
        <Box
          sx={{
            marginTop: "1rem",
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
          {/* Signin Avatar */}
          <Avatar sx={{ m: 1 }}>
            <LoginIcon />
          </Avatar>

          {/* Sign Up Title */}
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
            Sign up to the&nbsp;
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
              System
            </Typography>
          </Typography>

          {/* Form for getting Input data from the user */}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            {/* Get the registration data */}
            {/* First name of the user */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  onChange={handleChange}
                  value={data.firstName}
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>

              {/* Last name of the user */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  onChange={handleChange}
                  value={data.lastName}
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>

              {/* Email of the user */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={handleChange}
                  value={data.email}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>

              {/* Password of the user */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={handleChange}
                  value={data.password}
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            {/* Alert when error */}
            {error && (
              <Alert severity="error" sx={{ marginTop: "1rem" }}>
                {error}
              </Alert>
            )}

            {/* Toast message */}
            {message && showToastMessage()}
            <ToastContainer />

            {/* Submit button for the Form (Registration) */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>

            {/* Already have an account */}
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </Box>
  );
}
