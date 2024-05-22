import React from "react";
import ResponsiveDrawer from "../components/SideBar";
import { Box, Button, Divider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Background from "../assets/registration.jpg";
import { useState } from "react";
import axios from "axios";
// import CircularProgress from "@material-ui/core/CircularProgress";

const drawerWidth = 260;

function EmployeeRegistration() {
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [role, setRole] = useState(null);
  const [address, setAddress] = useState(null);
  const [email, setEmail] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handling the Employee resgistration
  const userRegistration = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      // Create a data object
      const data = {
        firstName: firstName,
        lastName: lastName,
        address: address,
        role: role,
        mobile: mobile,
        email: email,
        birthday: birthday,
      };

      // API route of the user registration
      const url = "http://localhost:8080/api/employee";

      // Post the data to the URL and wait for the request
      const { data: res } = await axios.post(url, data);
      // console.log(res.message);
      setLoading(false);
      handleSuccessMessage();
    } catch (error) {
      handleErrorMessage();
      setLoading(false);
      console.log(error);
    }
  };

  //   Functionality for handling the Snack bar notification
  const handleSuccessMessage = () => {
    setSuccessOpen(true);
  };

  // Setting the error snack bar notification
  const handleErrorMessage = () => {
    setErrorOpen(true);
  };

  //   Close the toast message
  const handleSuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessOpen(false);
  };

  const handleErrorClose = (event, reason) => {
    if (reason == "clickaway") {
      return;
    }
    setErrorOpen(false);
  };

  // Input Handling functions
  const handleFirstNameChange = (event) => {
    const firstName = event.target.value;
    setFirstName(firstName);
  };

  const handleLastNameChange = (event) => {
    const lastName = event.target.value;
    setLastName(lastName);
  };

  const handleRoleChange = (event) => {
    const role = event.target.value;
    setRole(role);
  };

  const handleAddressChange = (event) => {
    const address = event.target.value;
    setAddress(address);
  };

  const handleEmailChange = (event) => {
    const email = event.target.value;
    setEmail(email);
  };

  const handleBirthdayChange = (event) => {
    const birthday = event.target.value;
    setBirthday(birthday);
  };

  const handleMobileChange = (event) => {
    const mobile = event.target.value;
    setMobile(mobile);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="responsive drawer"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

        <ResponsiveDrawer />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
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
            justifyContent: "center",
            color: "text.secondary",
          }}
        >
          {" "}
          Employee Registration
        </Typography>

        <Divider sx={{ marginTop: "2rem" }} />

        {/* User registration inputs */}
        <form onSubmit={userRegistration}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Box
                sx={{
                  display: "block",
                  textAlign: "center",
                  width: "80%",
                  margin: "2rem",
                }}
              >
                {/* First Name Input Field */}
                <Grid direction={"column"} container spacing={1}>
                  <Grid item xs={2}>
                    <Typography
                      variant="h7"
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        textAlign: "center",
                        justifyContent: "left",
                        color: "text.primary",
                      }}
                    >
                      First Name
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    xs={8}
                    sx={{ display: "flex", justifyContent: "left" }}
                  >
                    <TextField
                      size="small"
                      id="first-name"
                      variant="outlined"
                      value={firstName ?? ""}
                      onChange={handleFirstNameChange}
                      sx={{ width: "100%" }}
                      required
                    />
                  </Grid>
                </Grid>

                {/* last Name Input Field */}
                <Grid
                  direction={"column"}
                  container
                  spacing={1}
                  sx={{ marginTop: "1rem" }}
                >
                  <Grid item xs={2}>
                    <Typography
                      variant="h7"
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        textAlign: "center",
                        justifyContent: "left",
                        color: "text.primary",
                      }}
                    >
                      Last Name
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    xs={8}
                    sx={{ display: "flex", justifyContent: "left" }}
                  >
                    <TextField
                      size="small"
                      id="last-name"
                      variant="outlined"
                      value={lastName ?? ""}
                      onChange={handleLastNameChange}
                      sx={{ width: "100%" }}
                      required
                    />
                  </Grid>
                </Grid>

                {/* Role Input Field */}
                <Grid
                  direction={"column"}
                  container
                  spacing={1}
                  sx={{ marginTop: "1rem" }}
                >
                  <Grid item xs={2}>
                    <Typography
                      variant="h7"
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        textAlign: "center",
                        justifyContent: "left",
                        color: "text.primary",
                      }}
                    >
                      Role of the Employee
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    xs={8}
                    sx={{ display: "flex", justifyContent: "left" }}
                  >
                    <TextField
                      size="small"
                      id="role"
                      variant="outlined"
                      value={role ?? ""}
                      onChange={handleRoleChange}
                      sx={{ width: "100%" }}
                      required
                    />
                  </Grid>
                </Grid>

                {/* Address Input Field */}
                <Grid
                  direction={"column"}
                  container
                  spacing={1}
                  sx={{ marginTop: "1rem" }}
                >
                  <Grid item xs={2}>
                    <Typography
                      variant="h7"
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        textAlign: "center",
                        justifyContent: "left",
                        color: "text.primary",
                      }}
                    >
                      Address
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    xs={8}
                    sx={{ display: "flex", justifyContent: "left" }}
                  >
                    <TextField
                      size="small"
                      id="address"
                      variant="outlined"
                      value={address ?? ""}
                      onChange={handleAddressChange}
                      sx={{ width: "100%" }}
                      required
                    />
                  </Grid>
                </Grid>

                {/* Email Input Field */}
                <Grid
                  direction={"column"}
                  container
                  spacing={1}
                  sx={{ marginTop: "1rem" }}
                >
                  <Grid item xs={2}>
                    <Typography
                      variant="h7"
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        textAlign: "center",
                        justifyContent: "left",
                        color: "text.primary",
                      }}
                    >
                      Email
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    xs={8}
                    sx={{ display: "flex", justifyContent: "left" }}
                  >
                    <TextField
                      size="small"
                      id="email"
                      variant="outlined"
                      value={email ?? ""}
                      onChange={handleEmailChange}
                      sx={{ width: "100%" }}
                      required
                      type="email"
                    />
                  </Grid>
                </Grid>

                {/* BirthDate Input Field */}
                <Grid
                  direction={"column"}
                  container
                  spacing={1}
                  sx={{ marginTop: "1rem" }}
                >
                  <Grid item xs={2}>
                    <Typography
                      variant="h7"
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        textAlign: "center",
                        justifyContent: "left",
                        color: "text.primary",
                      }}
                    >
                      Birthday
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    xs={8}
                    sx={{ display: "flex", justifyContent: "left" }}
                  >
                    <TextField
                      size="small"
                      id="birthday"
                      variant="outlined"
                      helperText="Enter date in YYYY/MM/DD format"
                      value={birthday ?? ""}
                      onChange={handleBirthdayChange}
                      sx={{ width: "100%" }}
                      required
                    />
                  </Grid>
                </Grid>

                {/* Mobile Number Input Field */}
                <Grid
                  direction={"column"}
                  container
                  spacing={1}
                  sx={{ marginTop: "0.5rem" }}
                >
                  <Grid item xs={2}>
                    <Typography
                      variant="h7"
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        textAlign: "center",
                        justifyContent: "left",
                        color: "text.primary",
                      }}
                    >
                      Mobile Number
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    xs={8}
                    sx={{ display: "flex", justifyContent: "left" }}
                  >
                    <TextField
                      size="small"
                      id="mobile"
                      variant="outlined"
                      value={mobile ?? ""}
                      onChange={handleMobileChange}
                      sx={{ width: "100%" }}
                      required
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={5}>
              <div
                style={{
                  backgroundColor: "beige",
                  margin: "1rem",
                  borderRadius: "10px",
                  display: "flex",
                  width: "100%",
                  height: "80%",
                  backgroundImage: `url(${Background})`,
                  backgroundSize: "cover",
                  // backgroundAttachment: "fixed",
                }}
              ></div>
            </Grid>
          </Grid>

          {/* Registration Button */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "2rem",
            }}
          >
            <Button
              type="submit"
              disabled={loading}
              sx={{
                padding: "0.5rem",
                borderRadius: "0.5rem",
                width: "40%",
                fontSize: "1.2rem",
              }}
              variant="contained"
            >
              Register the Employee
            </Button>
          </Box>
        </form>

        {/* Alert Message After Registering the user */}
        <div>
          <Snackbar
            open={successOpen}
            autoHideDuration={6000}
            onClose={handleSuccessClose}
          >
            <Alert
              onClose={handleSuccessClose}
              severity="success"
              variant="filled"
              sx={{ width: "100%" }}
            >
              Employee is registered Successfully!
            </Alert>
          </Snackbar>
        </div>

        <div>
          <Snackbar
            open={errorOpen}
            autoHideDuration={6000}
            onClose={handleErrorClose}
          >
            <Alert
              onClose={handleErrorClose}
              severity="error"
              variant="filled"
              sx={{ width: "100%" }}
            >
              Employee Registration Failed. Try Again!
            </Alert>
          </Snackbar>
        </div>
      </Box>
    </Box>
  );
}

export default EmployeeRegistration;
