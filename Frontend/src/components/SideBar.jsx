import * as React from "react";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import PaidIcon from "@mui/icons-material/Paid";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate } from "react-router-dom";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";

const drawerWidth = 260;

function ResponsiveDrawer() {
  const navigate = useNavigate();

  // Function to Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const drawer = (
    <div>
      <Typography
        variant="h5"
        component="a"
        href="/dashboard"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          marginTop: "1rem",
          marginBottom: "1rem",
          alignSelf: "center",
          textAlign: "center",
          justifyContent: "center",
          color: "primary.main",
          textDecoration: 0,
        }}
      >
        B2 Hotel Complex
        <br />
        Dashboard
      </Typography>

      <Divider />

      <List>
        <ListItem key={1}>
          <ListItemButton
            onClick={() => {
              navigate("/dashboard/employee-registration");
            }}
          >
            <ListItemIcon>{<PersonAddAltOutlinedIcon />}</ListItemIcon>
            <ListItemText primary={"Employee Registration"} />
          </ListItemButton>
        </ListItem>

        {/* Employee Management */}
        <ListItem key={2}>
          <ListItemButton
            onClick={() => {
              navigate("/dashboard/employee-management");
            }}
          >
            <ListItemIcon>{<PersonOutlineOutlinedIcon />}</ListItemIcon>
            <ListItemText primary={"Attendace Management"} />
          </ListItemButton>
        </ListItem>

        {/* Payment Management */}
        <ListItem key={3}>
          <ListItemButton
            onClick={() => {
              navigate("/dashboard/payment-management");
            }}
          >
            <ListItemIcon>{<PaidIcon />}</ListItemIcon>
            <ListItemText primary={"Payments Management"} />
          </ListItemButton>
        </ListItem>

        {/*  Employee Infomation */}
        <ListItem key={4}>
          <ListItemButton
            onClick={() => {
              navigate("/dashboard/employee-infomation");
            }}
          >
            <ListItemIcon>{<SupervisedUserCircleIcon />}</ListItemIcon>
            <ListItemText primary={"Employee Infomation"} />
          </ListItemButton>
        </ListItem>

        {/* User Registration */}
        <ListItem key={5}>
          <ListItemButton
            onClick={() => {
              navigate("/dashboard/user-registration");
            }}
          >
            <ListItemIcon>{<ManageAccountsOutlinedIcon />}</ListItemIcon>
            <ListItemText primary={"User Registration"} />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />

      <List>
        <ListItem key={1}>
          <ListItemButton onClick={logout}>
            <ListItemIcon>{<LogoutOutlinedIcon />}</ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", sm: "block" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
        },
      }}
      open
    >
      {drawer}
    </Drawer>
  );
}

export default ResponsiveDrawer;
