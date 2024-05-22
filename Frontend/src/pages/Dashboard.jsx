import React from "react";
import ResponsiveDrawer from "../components/SideBar";
import { Box, Divider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";

const drawerWidth = 260;

function Dashboard() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
        }}
      >
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
            }}
          >
            Welcome to the Administrator Dashboard of the &nbsp;
            <Typography
              component="span"
              variant="h4"
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignSelf: "center",
                textAlign: "center",
                color: "primary.main",
              }}
            >
              B2 Hotel Comlplex
            </Typography>
          </Typography>

          {/* <Typography
            variant="h5"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              marginTop: "2rem",
              marginBottom: "1rem",
              alignSelf: "center",
              textAlign: "center",
              justifyContent: "center",
              color: "text.secondary",
            }}
          ></Typography> */}

          <Typography
            variant="h5"
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "2rem",
              alignSelf: "center",
              justifyContent: "left",
              color: "text.secondary",
            }}
          >
            Here are the features of the Dashboard
            <br />
          </Typography>

          <Divider></Divider>

          <Typography
            component="div"
            variant="h6"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "left",
              color: "text.secondary",
            }}
          >
            <ul>
              <li>
                Employee Registration - Register Employees to the System by
                entering the employee's information
              </li>
              <li>
                User Regsitration - Register the users to the system. They can
                get the admin access to the Dashboard. They can login to the
                Dashboard and use it.
              </li>
              <li>
                Attendance Management - Manage the attendance of the employees.
                Get the statistics about attendance of the employees.
              </li>

              <li>
                Payment Management - Manage the payments that have done for
                employees. Get statistics and details about payments.
              </li>

              <li>
                Employee Infomation - Manage the employee infomation. Get and
                edit the infomation of employee.
              </li>
            </ul>
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
