import React from "react";
import ResponsiveDrawer from "../components/SideBar";
import {
  Box,
  Card,
  CardHeader,
  Divider,
  CardContent,
  CardActions,
  Button,
  CardMedia,
  Grid,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { ConstructionOutlined } from "@mui/icons-material";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import Chip from "@mui/material/Chip";

const drawerWidth = 260;

// column names for the Table
const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "date", label: "Date", minWidth: 100, align: "center" },
  {
    id: "payment",
    label: "Payment",
    minWidth: 170,
    align: "center",
  },
];

const detailsColumn = [
  { id: "date", label: "Date", minWidth: 100, align: "center" },
  {
    id: "payment",
    label: "Payment",
    minWidth: 170,
    align: "center",
  },
];

// Create Data for Main Payments table
function createData(name, date, amount) {
  const amountNumber = Number(amount).toFixed(2);
  const paymentString = "Rs " + String(amountNumber);
  const payment = (
    <Chip
      icon={<LocalAtmIcon />}
      label={`${paymentString}`}
      color="primary"
      variant="outlined"
    />
  );
  return { name, date, payment };
}

// Create Data for selected table
function createDetailsData(date, amount) {
  const amountNumber = Number(amount).toFixed(2);
  const paymentString = "Rs " + String(amountNumber);
  const payment = (
    <Chip
      icon={<LocalAtmIcon />}
      label={`${paymentString}`}
      color="primary"
      variant="outlined"
    />
  );
  return { date, payment };
}

function PaymentManagement() {
  const [employeeData, setEmployeeData] = React.useState([]);
  const [selectedEmployee, seteSetectedEmployee] = React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [payment, setPayemnt] = React.useState("");
  const [employeeNames, setEmployeeNames] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([]);

  //   State Variables for managing the selected employee payments
  const [employeeDetailsName, setEmployeeDetailsName] = useState(null);
  const [detailsPage, setDetailsPage] = React.useState(0);
  const [rowsPerDetailsPage, setRowsPerDetailsPage] = React.useState(10);
  const [detailsRows, setDetailsRows] = useState([]);
  const [monthlyTotal, setMonthyTotal] = useState(null);

  //   Pagination Handkling function
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //   Set Details row Pagination
  const handleChangeDetailsPage = (event, newPage) => {
    setDetailsPage(newPage);
  };

  const handleChangeRowsPerDetailPage = (event) => {
    setRowsPerDetailsPage(+event.target.value);
    setDetailsPage(0);
  };

  //   This handling the dialog opening
  const handleClickDialogOpen = (event) => {
    setDialogOpen(true);
  };

  const handleDialogCloseNo = () => {
    setDialogOpen(false);
  };

  //   Record the Payment ito the database
  const handleDialogCloseYes = async () => {
    const recordPayment = async (id, name, amount) => {
      const url = "http://localhost:8080/api/payments/add-payment";
      const data = {
        employeeId: id,
        name: name,
        payment: amount,
      };
      console.log(data);

      const { data: res } = await axios.post(url, data);
      return res;
    };

    try {
      const employee = employeeNames.find(
        (employee) => employee.id === selectedEmployee
      );
      const name = employee.name;
      const res = await recordPayment(selectedEmployee, name, payment);
      updatePaymentTable();
      setDialogOpen(false);
    } catch (error) {
      console.error("Error recording attendance:", error);
    }
  };

  //   Payment Table Update Function
  const updatePaymentTable = () => {
    try {
      const fetchPayments = async () => {
        const url = "http://localhost:8080/api/payments/all";
        const employeeData = await axios.get(url);
        return employeeData.data;
      };

      const fetchData = async () => {
        const payments = await fetchPayments();
        const rows = payments.map((payment) =>
          createData(payment.name, payment.date.split("T")[0], payment.payment)
        );
        setRows(rows);
      };

      fetchData();
      console.log(rows);
    } catch (error) {
      console.log(error);
    }
  };
  //   Get the employee Data from the use effect (Initial rendering)
  useEffect(() => {
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
        // const rows = await Promise.all(
        //   employeeData.map(async (employee) => {
        //     const attendanceState = await getAttendanceState(employee._id);
        //     return createData(
        //       employee._id,
        //       employee.firstName + " " + employee.lastName,
        //       employee.role,
        //       attendanceState,
        //       handleAttendance
        //     );
        //   })
        // );

        // setRows(rows);
      };

      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  //   Use effect to get the payment data
  useEffect(() => {
    try {
      const fetchPayments = async () => {
        const url = "http://localhost:8080/api/payments/all";
        const employeeData = await axios.get(url);
        return employeeData.data;
      };

      const fetchData = async () => {
        const payments = await fetchPayments();
        const rows = payments.map((payment) =>
          createData(payment.name, payment.date.split("T")[0], payment.payment)
        );
        setRows(rows);
      };

      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  //   Get Employee Details base Payments
  useEffect(() => {
    try {
      const fetchPayments = async (employeeId) => {
        const url = "http://localhost:8080/api/payments/get-employee-payments";
        const data = {
          employeeId: employeeId,
        };
        const employeeData = await axios.post(url, data);
        return employeeData.data;
      };

      const fetchData = async () => {
        const payments = await fetchPayments(employeeDetailsName);

        // Filter payments for this month
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const filteredPayments = payments.filter((payment) => {
          const paymentDate = new Date(payment.date);
          return (
            paymentDate.getMonth() === currentMonth &&
            paymentDate.getFullYear() === currentYear
          );
        });

        // Calculate total payment for this month
        const totalPaymentForThisMonth = filteredPayments.reduce(
          (total, payment) => total + payment.payment,
          0
        );

        const formattedTotalPaymentForThisMonth = parseFloat(
          totalPaymentForThisMonth
        ).toFixed(2);
        setMonthyTotal(formattedTotalPaymentForThisMonth);

        const detailsRows = payments.map((payment) =>
          createDetailsData(payment.date.split("T")[0], payment.payment)
        );
        setDetailsRows(detailsRows);
      };

      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [employeeDetailsName]);

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
            Payment &nbsp;
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
              Management
            </Typography>
          </Typography>

          <Divider></Divider>

          {/* Select the Employee For the Payment */}

          {/* Payment Inserting */}
          <Card variant="outlined" sx={{ m: "1rem" }}>
            <CardContent>
              <Grid container spacing={2}>
                {/* Card Content */}
                <Grid
                  display={"flex"}
                  sx={{ flexDirection: "column" }}
                  item
                  xs={12}
                  sm={8}
                >
                  <Typography variant="h5" component="div">
                    Payment Tracking
                  </Typography>

                  <Typography sx={{ mb: 1.0 }} color="text.secondary">
                    Enter Details for record the Payment
                  </Typography>

                  <Divider></Divider>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleClickDialogOpen();
                    }}
                  >
                    {/* Get the Employee Name */}
                    <Typography sx={{ m: "1rem" }} variant="body2">
                      Select the employee (Payemnt to be processed)
                    </Typography>

                    <Autocomplete
                      disablePortal
                      size="small"
                      id="name-select"
                      //   options={employeeNames}
                      options={employeeData.map((employee) => ({
                        label: `${employee.firstName} ${employee.lastName}`,
                        value: employee._id,
                      }))}
                      sx={{
                        width: "70%",
                        marginTop: "1rem",
                        marginLeft: "1rem",
                      }}
                      isOptionEqualToValue={(option, value) =>
                        option.value === value.value
                      }
                      renderInput={(params) => (
                        <TextField required {...params} />
                      )}
                      onChange={(event, employee) => {
                        if (!employee) {
                          seteSetectedEmployee(null);
                          console.log("clear");
                        } else {
                          seteSetectedEmployee(employee.value);
                        }
                      }}
                    />

                    {/* Enter the Amount to be paid */}

                    <Typography sx={{ m: "1rem" }} variant="body2">
                      Enter the Amount
                    </Typography>

                    <TextField
                      size="small"
                      sx={{
                        marginLeft: "1rem",
                        marginBottom: "1rem",
                        width: "70%",
                      }}
                      id="payment"
                      placeholder="Enter the payment"
                      type="number"
                      value={payment}
                      onChange={(event) => {
                        const payment = event.target.value;
                        setPayemnt(payment);
                      }}
                      required
                    ></TextField>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        variant="contained"
                        type="submit"
                        sx={{
                          margin: "1rem",
                          width: "60%",
                          borderRadius: "1rem",
                        }}
                      >
                        Proceed the Payment
                      </Button>
                    </div>
                  </form>

                  <Dialog
                    open={dialogOpen}
                    onClose={handleDialogCloseNo}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Proceed the Payment?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Are you sure you want to proceeed?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleDialogCloseNo}>No</Button>
                      <Button onClick={handleDialogCloseYes} autoFocus>
                        Yes
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <CardMedia
                    component="img"
                    sx={{ height: "100%" }}
                    image="/src/assets/payment.jpg"
                    alt="payment"
                  ></CardMedia>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Show the Payments of All Employees done */}

          <Typography
            variant="h5"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              marginTop: "3rem",
              marginBottom: "1rem",
              alignSelf: "center",
              textAlign: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            All Payment Details
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
                          backgroundColor: "lightblue",
                          fontSize: "1.2rem",
                          fontWeight: "bold",
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
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {value}
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

          {/* Show the Details of selected Employee */}
          <Typography
            variant="h5"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              marginTop: "3rem",
              marginBottom: "1rem",
              alignSelf: "center",
              textAlign: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            Details of Selected Employee
          </Typography>

          {/* Select the employee Name */}

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
            }}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            renderInput={(params) => <TextField {...params} />}
            onChange={(event, employee) => {
              if (!employee) {
                setEmployeeDetailsName(null);
                console.log("clear");
              } else {
                setEmployeeDetailsName(employee.value);
              }
            }}
          />

          {employeeDetailsName && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Card sx={{ width: "50%", margin: "1rem" }} variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="div">
                    Payment Details :{" "}
                    {
                      employeeNames.find(
                        (employee) => employee.id === employeeDetailsName
                      )?.name
                    }
                  </Typography>

                  <Typography variant="h6" color="text.secondary">
                    Total Payment for this month: Rs {monthlyTotal}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          )}

          {employeeDetailsName && (
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
                      {detailsColumn.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            minWidth: column.minWidth,
                            backgroundColor: "lightblue",
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                          }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {detailsRows
                      .slice(
                        detailsPage * rowsPerDetailsPage,
                        detailsPage * rowsPerDetailsPage + rowsPerDetailsPage
                      )
                      .map((row, index) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={index}
                          >
                            {detailsColumn.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {value}
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
                count={detailsRows.length}
                rowsPerPage={rowsPerDetailsPage}
                page={detailsPage}
                onPageChange={handleChangeDetailsPage}
                onRowsPerPageChange={handleChangeRowsPerDetailPage}
              />
            </Paper>
          )}

          <Divider style={{ margin: "3rem" }}></Divider>
        </Box>
      </Box>
    </>
  );
}

export default PaymentManagement;
