import React from "react";
import ResponsiveDrawer from "../components/SideBar";
import {
  Box,
  ButtonGroup,
  Card,
  CardContent,
  CardMedia,
  Divider,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Textarea } from "@mui/joy";

const drawerWidth = 260;

// Columns of the Employee
const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "address", label: "Address", minWidth: 200 },
  {
    id: "role",
    label: "Role",
    minWidth: 150,
    align: "center",
  },
  {
    id: "mobile",
    label: "Mobile",
    minWidth: 120,
    align: "center",
  },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
    align: "center",
  },
  {
    id: "birthday",
    label: "Birth Day",
    minWidth: 170,
    align: "center",
  },
];

// Create data function for user data column
function createData(
  firstName,
  lastName,
  address,
  role,
  mobile,
  email,
  birthDate
) {
  const name = firstName + " " + lastName;
  const birthday = birthDate.split("T")[0];
  // const birthday = birthDate;
  return { name, address, role, mobile, email, birthday };
}

function EmployeeInfomation() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [employeeData, setEmployeeData] = useState([]);
  const [rows, setRows] = useState([]);
  const [employeeNames, setEmployeeNames] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState();

  // Employee Details for Editing purpose
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [role, setRole] = useState();
  const [address, setAddress] = useState();
  const [mobile, setMobile] = useState();
  const [email, setEmail] = useState();
  const [birthday, setBirthday] = useState();
  const [edit, setEdit] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Handle the edit functionality
  const handleEdit = async () => {
    const updateEmployeeInfo = async () => {
      const url = "http://localhost:8080/api/employee/update-employee";
      const data = {
        employeeId: selectedEmployee,
        firstName: firstName,
        lastName: lastName,
        role: role,
        address: address,
        mobile: mobile,
        email: email,
        birthday: birthday,
      };

      const { data: res } = await axios.post(url, data);
      return res;
    };

    try {
      const res = await updateEmployeeInfo();
      updateInfoTable();
    } catch (error) {
      console.error("Error recording attendance:", error);
    } finally {
      setEdit(false);
    }
  };

  // Update the info table after updating user info
  const updateInfoTable = () => {
    try {
      const fetchEmployees = async () => {
        const url = "http://localhost:8080/api/employee/all";
        const employeeData = await axios.get(url);
        return employeeData.data;
      };

      const fetchData = async () => {
        const employeeData = await fetchEmployees();
        const employeeNames = employeeData.map((employee) => ({
          name: `${employee.firstName} ${employee.lastName}`,
          id: employee._id,
        }));

        setEmployeeNames(employeeNames);
        setEmployeeData(employeeData);

        // Setting Table rows
        const rows = await Promise.all(
          employeeData.map(async (employee) => {
            return createData(
              employee.firstName,
              employee.lastName,
              employee.address,
              employee.role,
              employee.mobile,
              employee.email,
              employee.birthday
            );
          })
        );

        setRows(rows);
      };

      fetchData();
      console.log(rows);
    } catch (error) {
      console.log(error);
    }
  };

  //   Get the employee Names for Manipulation
  useEffect(() => {
    // Get the users from the server
    try {
      const fetchEmployees = async () => {
        const url = "http://localhost:8080/api/employee/all";
        const employeeData = await axios.get(url);
        return employeeData.data;
      };

      const fetchData = async () => {
        const employeeData = await fetchEmployees();
        const employeeNames = employeeData.map((employee) => ({
          name: `${employee.firstName} ${employee.lastName}`,
          id: employee._id,
        }));

        setEmployeeNames(employeeNames);
        setEmployeeData(employeeData);

        // Setting Table rows
        const rows = await Promise.all(
          employeeData.map(async (employee) => {
            return createData(
              employee.firstName,
              employee.lastName,
              employee.address,
              employee.role,
              employee.mobile,
              employee.email,
              employee.birthday
            );
          })
        );

        setRows(rows);
      };

      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

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
            Employee &nbsp;
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
              Information
            </Typography>
          </Typography>

          <Divider></Divider>

          {/* Show All employee Data */}

          <Typography
            variant="h5"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              marginTop: "2rem",
              marginBottom: "1rem",
              alignSelf: "center",
              textAlign: "center",
              justifyContent: "left",
              color: "text.secondary",
            }}
          >
            Below table shows all the infomation about company employees.
          </Typography>

          <Paper
            sx={{
              width: "100%",
              overflow: "hidden",
              marginTop: "3rem",
              marginBottom: "3rem",
            }}
          >
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          fontSize: "1.2rem",
                          backgroundColor: "darkblue",
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                          style={{
                            backgroundColor:
                              index % 2 === 0 ? "lightgray" : "white",
                          }}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                sx={{
                                  fontSize: "1rem",
                                }}
                              >
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>

          <Divider></Divider>

          {/* Show Details of Selected Employee  */}
          <Typography
            variant="h5"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              marginTop: "2rem",
              marginBottom: "1rem",
              alignSelf: "center",
              textAlign: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            Infomation of Selected Employee
          </Typography>

          {/* Employee Selection */}
          <Typography
            variant="h7"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              marginTop: "3rem",
              alignSelf: "center",
              textAlign: "center",
              justifyContent: "left",
            }}
          >
            Select a Employee
          </Typography>

          {/* Select the Employee */}
          <Autocomplete
            disablePortal
            size="small"
            id="name-select"
            options={employeeData.map((employee) => ({
              label: `${employee.firstName} ${employee.lastName}`,
              value: employee._id,
            }))}
            sx={{
              width: "40%",
              marginBottom: "3rem",
            }}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            renderInput={(params) => <TextField {...params} />}
            onChange={(event, employee) => {
              if (!employee) {
                // Changing the selected data to null if not employee is selected
                setSelectedEmployee(null);
                setFirstName(null);
                setLastName(null);
                setRole(null);
                setAddress(null);
                setMobile(null);
                setEmail(null);
                setBirthday(null);
                console.log("clear");
              } else {
                setSelectedEmployee(employee.value);
                const employeeDetails = employeeData.find(
                  (singleEmployee) => singleEmployee._id === employee.value
                );
                const birthDate = employeeDetails.birthday.split("T")[0];
                setFirstName(employeeDetails.firstName);
                setLastName(employeeDetails.lastName);
                setAddress(employeeDetails.address);
                setRole(employeeDetails.role);
                setMobile(employeeDetails.mobile);
                setEmail(employeeDetails.email);
                setBirthday(birthDate);
              }
            }}
          />

          {selectedEmployee && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "3rem",
                marginBottom: "3rem",
              }}
            >
              <Card sx={{ width: "60%" }} variant="outlined">
                <CardContent>
                  {/* Add A Image */}

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1rem",
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="h6" color="text.secondary">
                      Details of the Employee
                    </Typography>

                    <CardMedia
                      component="img"
                      sx={{
                        width: "40%",
                        borderRadius: "1rem",
                      }}
                      image="/src/assets/profile.jpg"
                      alt="payment"
                    ></CardMedia>
                  </div>
                  {/*  Show The Employee Details */}

                  {/* First Name */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "1rem",
                      flexDirection: "row",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "1rem",
                        marginLeft: "1.5rem",
                        fontWeight: "bold",
                      }}
                    >
                      First Name:{" "}
                    </Typography>

                    {/* Value */}
                    <Textarea
                      color="neutral"
                      sx={{
                        width: "60%",
                        "& .Mui-disabled": { color: "black" },
                      }}
                      disabled={!edit}
                      onChange={(event) => {
                        setFirstName(event.target.value);
                      }}
                      size="md"
                      value={firstName}
                      variant="plain"
                    />
                  </div>

                  {/* Last Name */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "1rem",
                      flexDirection: "row",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "1rem",
                        marginLeft: "1.5rem",
                        fontWeight: "bold",
                      }}
                    >
                      Last Name:{" "}
                    </Typography>

                    {/* Value */}
                    <Textarea
                      color="neutral"
                      sx={{
                        width: "60%",
                        "& .Mui-disabled": { color: "black" },
                      }}
                      disabled={!edit}
                      onChange={(event) => {
                        setLastName(event.target.value);
                      }}
                      size="md"
                      value={lastName}
                      variant="plain"
                    />
                  </div>

                  {/* Address */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "1rem",
                      flexDirection: "row",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "1rem",
                        marginLeft: "1.5rem",
                        fontWeight: "bold",
                      }}
                    >
                      Address:{" "}
                    </Typography>

                    {/* Value */}
                    <Textarea
                      color="neutral"
                      sx={{
                        width: "60%",
                        "& .Mui-disabled": { color: "black" },
                      }}
                      disabled={!edit}
                      onChange={(event) => {
                        setAddress(event.target.value);
                      }}
                      size="md"
                      value={address}
                      variant="plain"
                    />
                  </div>

                  {/* Role */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "1rem",
                      flexDirection: "row",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "1rem",
                        marginLeft: "1.5rem",
                        fontWeight: "bold",
                      }}
                    >
                      Role:{" "}
                    </Typography>

                    {/* Value */}
                    <Textarea
                      color="neutral"
                      sx={{
                        width: "60%",
                        "& .Mui-disabled": { color: "black" },
                      }}
                      disabled={!edit}
                      onChange={(event) => {
                        setRole(event.target.value);
                      }}
                      size="md"
                      value={role}
                      variant="plain"
                    />
                  </div>

                  {/* Mobile */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "1rem",
                      flexDirection: "row",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "1rem",
                        marginLeft: "1.5rem",
                        fontWeight: "bold",
                      }}
                    >
                      Mobile:{" "}
                    </Typography>

                    {/* Value */}
                    <Textarea
                      color="neutral"
                      sx={{
                        width: "60%",
                        "& .Mui-disabled": { color: "black" },
                      }}
                      disabled={!edit}
                      onChange={(event) => {
                        setMobile(event.target.value);
                      }}
                      value={mobile}
                      size="md"
                      variant="plain"
                    />
                  </div>

                  {/* Email */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "1rem",
                      flexDirection: "row",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "1rem",
                        marginLeft: "1.5rem",
                        fontWeight: "bold",
                      }}
                    >
                      Email{" "}
                    </Typography>

                    {/* Value */}
                    <Textarea
                      color="neutral"
                      sx={{
                        width: "60%",
                        "& .Mui-disabled": { color: "black" },
                      }}
                      disabled={!edit}
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                      size="md"
                      value={email}
                      variant="plain"
                    />
                  </div>

                  {/* Birthday */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "1rem",
                      flexDirection: "row",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "1rem",
                        marginLeft: "1.5rem",
                        fontWeight: "bold",
                      }}
                    >
                      Birth Day:{" "}
                    </Typography>

                    {/* Value */}
                    <Textarea
                      color="neutral"
                      sx={{
                        width: "60%",
                        "& .Mui-disabled": { color: "black" },
                      }}
                      disabled={!edit}
                      onChange={(event) => {
                        // const newBirthday = event.target.value.split("T")[0];
                        setBirthday(event.target.value);
                      }}
                      size="md"
                      value={birthday}
                      variant="plain"
                    />
                  </div>

                  {/* Edit Infomation */}
                  {!edit && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      <Button
                        width={"60%"}
                        variant="contained"
                        onClick={() => {
                          setEdit(true);
                        }}
                      >
                        Edit Infomation
                      </Button>
                    </div>
                  )}

                  {/* Edit Confirmation */}
                  {edit && (
                    <ButtonGroup
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        marginTop: "1rem",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ marginRight: "2rem" }}
                        onClick={handleEdit}
                      >
                        Confirm
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          setEdit(false);
                        }}
                      >
                        Cancel
                      </Button>
                    </ButtonGroup>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          <Divider></Divider>
        </Box>
      </Box>
    </>
  );
}

export default EmployeeInfomation;
