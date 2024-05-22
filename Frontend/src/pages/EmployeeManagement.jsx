import React from "react";
import ResponsiveDrawer from "../components/SideBar";
import { Box, Card, Divider, Grid, Stack } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import ButtonGroup from "@mui/material/ButtonGroup";
import Chip from "@mui/material/Chip";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { LineChart } from "@mui/x-charts/LineChart";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { useEffect } from "react";

// Sidebar width
const drawerWidth = 260;

const recordColumns = [
  { id: "date", label: "Date", minWidth: 200 },
  {
    id: "attendanceStatus",
    label: "Attendace",
    minWidth: 200,
  },
  {
    id: "markedStatus",
    label: "Recorded Status (Marked)",
    align: "center",
  },
];

// Table Column Headers
const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "role", label: "Role", minWidth: 100 },
  {
    id: "currentStatus",
    label: "Current Status",
    minWidth: 150,
    align: "center",
  },
  {
    id: "markAttendance",
    label: "Mark Attendance",
    minWidth: 200,
    align: "center",
  },
];

// This function handle the attendance

function createData(id, name, role, attendanceStatus, handleAttendance) {
  const currentStatus = (
    <Chip
      label={attendanceStatus ? "Marked" : "Not Marked"}
      color="primary"
      variant="outlined"
    />
  );

  const markAttendance = (
    <ButtonGroup>
      <Button
        variant="contained"
        color="success"
        startIcon={<CheckIcon />}
        size="small"
        sx={{ marginRight: "1rem" }}
        onClick={() => handleAttendance(name, id, true)}
      >
        Present
      </Button>

      <Button
        variant="contained"
        color="error"
        startIcon={<ClearIcon />}
        size="small"
        onClick={() => handleAttendance(name, id, false)}
      >
        Absent
      </Button>
    </ButtonGroup>
  );

  return { id, name, role, currentStatus, markAttendance };
}

function createRecordData(recordDate, attendance, marked) {
  const date = recordDate.split("T")[0];

  const markedStatus = marked ? (
    <Chip label="Marked" color="success" variant="outlined" />
  ) : (
    <Chip label="Not Marked" color="error" variant="outlined" />
  );

  const attendanceVal = () => {
    if (attendance === "Present") {
      return true;
    } else {
      return false;
    }
  };

  const isPresent = attendanceVal();

  const attendanceStatus = isPresent ? (
    <Chip label="Present" color="primary" />
  ) : (
    <Chip label="Absent" color="error" />
  );

  return { date, markedStatus, attendanceStatus };
}

function EmployeeManagement() {
  // Pafination Handling
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [recordPage, setRecordPage] = React.useState(0);
  const [rowsPerRecordPage, setRowsPerRecordPage] = React.useState(10);
  const [selectedEmployee, seteSetectedEmployee] = React.useState();
  const [inputValue, setInputValue] = React.useState("");
  const [employeeNames, setEmployeeNames] = React.useState([]);
  const [employeeData, setEmployeeData] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [employeeCount, setEmployeeCount] = React.useState(1);
  const [attendanceLast7Days, setAttendancelast7Days] = React.useState([]);
  const [last7Days, setLast7Days] = React.useState([]);
  const [todayAttendance, setTodayAttendance] = React.useState();
  const [records, setRecords] = React.useState([]);

  //   UseEffect for rendering when the selected EmployeeChange changes
  useEffect(() => {
    try {
      const fetchAttendanceRecords = async (employeeId) => {
        const url = "http://localhost:8080/api/attendance/get-single";
        const data = {
          employeeId: employeeId,
        };
        const attendanceData = await axios.post(url, data);
        return attendanceData.data;
      };

      const fetchData = async (employeeId) => {
        const AttendanceData = await fetchAttendanceRecords(employeeId);

        const records = await Promise.all(
          AttendanceData.map(async (record) => {
            return createRecordData(record.date, record.status, record.marked);
          })
        );

        setRecords(records);
      };

      fetchData(selectedEmployee);
    } catch (error) {
      console.error(error);
    }
  }, [selectedEmployee]);

  //   Update States after buttonClicks
  const handleUpdates = () => {
    try {
      const fetchAttendanceData = async () => {
        const url = "http://localhost:8080/api/attendance/records-last-7-days";
        const employeeData = await axios.get(url);
        return employeeData.data;
      };

      const fetchData = async () => {
        const AttendanceData = await fetchAttendanceData();
        if (Array.isArray(AttendanceData)) {
          const attendanceLast7Days = AttendanceData.map((data) => data.count);
          const last7Days = AttendanceData.map((data) => data.date);
          setAttendancelast7Days(attendanceLast7Days);
          setLast7Days(last7Days);
          const todayAttendance = attendanceLast7Days.at(6);
          setTodayAttendance(todayAttendance);
        } else {
          console.error("Attendance data is not an array");
        }
      };

      const fetchEmployees = async () => {
        const url = "http://localhost:8080/api/employee/all";
        const employeeData = await axios.get(url);
        return employeeData.data;
      };

      const fetchAttendace = async () => {
        const employeeData = await fetchEmployees();
        const employeeNames = employeeData.map(
          (employee) => employee.firstName + " " + employee.lastName
        );
        setEmployeeNames(employeeNames);
        setEmployeeData(employeeData);

        const employeeCount = employeeData.length;
        setEmployeeCount(employeeCount);

        // Setting Table rows
        const rows = await Promise.all(
          employeeData.map(async (employee) => {
            const attendanceState = await getAttendanceState(employee._id);
            return createData(
              employee._id,
              employee.firstName + " " + employee.lastName,
              employee.role,
              attendanceState,
              handleAttendance
            );
          })
        );

        setRows(rows);
      };

      fetchData();
      fetchAttendace();
    } catch (error) {
      console.log(error);
    }
  };

  //   Get Attendance State
  const getAttendanceState = async (id) => {
    const url = "http://localhost:8080/api/attendance/get-current-status";
    const data = {
      employeeId: id,
    };

    const { data: res } = await axios.post(url, data);
    // console.log(res.status);
    return res.status;
  };

  //   Perform Attendance Handling
  const handleAttendance = async (name, id, status) => {
    const recordAttendance = async (id, status, name) => {
      const url = "http://localhost:8080/api/attendance/record";
      const data = {
        employeeId: id,
        name: name,
        status: status ? "Present" : "Absent",
      };
      console.log(data);

      const { data: res } = await axios.post(url, data);
      return res;
    };

    try {
      const res = await recordAttendance(id, status, name);
      handleUpdates();
    } catch (error) {
      console.error("Error recording attendance:", error);
    }
  };

  //   Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //   Pagination for attendance Record Table
  const handleChangeRecordPage = (event, newPage) => {
    setRecordPage(newPage);
  };

  const handleChangeRowsPerRecordPage = (event) => {
    setRowsPerRecordPage(+event.target.value);
    setRecordPage(0);
  };

  //   Use Effect to get Attendance Data initially
  useEffect(() => {
    try {
      const fetchAttendanceData = async () => {
        const url = "http://localhost:8080/api/attendance/records-last-7-days";
        const employeeData = await axios.get(url);
        return employeeData.data;
      };

      const fetchData = async () => {
        const AttendanceData = await fetchAttendanceData();
        if (Array.isArray(AttendanceData)) {
          const attendanceLast7Days = AttendanceData.map((data) => data.count);
          const last7Days = AttendanceData.map((data) => data.date);
          setAttendancelast7Days(attendanceLast7Days);
          setLast7Days(last7Days);
          const todayAttendance = attendanceLast7Days.at(6);
          setTodayAttendance(todayAttendance);
        } else {
          console.error("Attendance data is not an array");
        }
      };

      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

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
        const employeeNames = employeeData.map(
          (employee) => employee.firstName + " " + employee.lastName
        );
        setEmployeeNames(employeeNames);
        setEmployeeData(employeeData);

        const employeeCount = employeeData.length;
        setEmployeeCount(employeeCount);

        // Setting Table rows
        const rows = await Promise.all(
          employeeData.map(async (employee) => {
            const attendanceState = await getAttendanceState(employee._id);
            return createData(
              employee._id,
              employee.firstName + " " + employee.lastName,
              employee.role,
              attendanceState,
              handleAttendance
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

  //   Rendering the component
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
            Employee&nbsp;
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

          {/* Divider */}
          <Divider></Divider>

          {/* Current Status of Attendance */}

          <Typography
            variant="h5"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              marginTop: "1rem",
              marginBottom: "1rem",
              alignSelf: "center",
              textAlign: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            Attendance Statistics
          </Typography>

          {/* Statisctics UI */}
          <Grid
            container
            spacing={2}
            sx={{ marginTop: "1rem", marginBottom: "1rem" }}
          >
            {/* Today Attendace */}
            <Grid item xs={6}>
              <Paper
                sx={{
                  display: "flex",
                  width: "100%",
                  margin: "1rem",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "auto",
                  border: "0.5px solid lightblue",
                  borderRadius: "1rem",
                }}
              >
                <Stack
                  direction={"column"}
                  spacing={2}
                  sx={{ marginTop: "1rem" }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      marginTop: "1rem",
                      alignSelf: "center",
                      textAlign: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Attendance of Today
                  </Typography>

                  <Gauge
                    value={(100 * todayAttendance) / employeeCount}
                    height={300}
                    width={300}
                    startAngle={-110}
                    endAngle={110}
                    sx={{
                      [`& .${gaugeClasses.valueText}`]: {
                        fontSize: 40,
                        transform: "translate(0px, 0px)",
                      },
                    }}
                    text={({ value, valueMax }) =>
                      `${todayAttendance} / ${employeeCount}`
                    }
                  />
                </Stack>
              </Paper>
            </Grid>

            {/* Overall Attendance */}
            <Grid item xs={6}>
              <Paper
                sx={{
                  display: "flex",
                  width: "100%",
                  margin: "1rem",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "auto",
                  border: "0.5px solid lightblue",
                  borderRadius: "1rem",
                }}
              >
                <Stack
                  direction={"column"}
                  spacing={2}
                  sx={{ marginTop: "1rem" }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      marginTop: "1rem",
                      alignSelf: "center",
                      textAlign: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Attendance of Past 7 Days
                  </Typography>

                  <LineChart
                    xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7] }]}
                    series={[
                      {
                        curve: "linear",
                        data: attendanceLast7Days,
                      },
                    ]}
                    width={500}
                    height={300}
                  />
                </Stack>
              </Paper>
            </Grid>
          </Grid>

          {/* Attendance Marking System */}

          <Divider></Divider>

          {/* Title */}
          <Typography
            variant="h5"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              marginTop: "5rem",
              alignSelf: "center",
              textAlign: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            Attendance Marking System
          </Typography>

          <Paper
            sx={{
              width: "100%",
              overflow: "hidden",
              marginTop: "1rem",
              marginBottom: "1rem",
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
                          backgroundColor: "lightblue",
                          color: "black",
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
                          style={{
                            textAlign: "center",
                          }}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
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

          {/* Attendance of selected Employee */}
          <Divider></Divider>

          <Typography
            variant="h5"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              marginTop: "5rem",
              alignSelf: "center",
              textAlign: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            Attendance of Selected Employee
          </Typography>

          {/* Select the Name of the Employee */}
          <Typography
            variant="h7"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              marginTop: "1rem",
              alignSelf: "center",
              textAlign: "center",
              justifyContent: "left",
            }}
          >
            Select the Employee Name Below
          </Typography>

          {/* Employee Name Selection */}
          <Autocomplete
            disablePortal
            size="small"
            id="name-select"
            // options={employeeNames}
            options={employeeData.map((employee) => ({
              label: `${employee.firstName} ${employee.lastName}`,
              value: employee._id,
            }))}
            sx={{ width: "50%", marginBottom: "3rem" }}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            renderInput={(params) => <TextField {...params} />}
            onChange={(event, employee) => {
              if (!employee) {
                seteSetectedEmployee(null);
                console.log("clear");
              } else {
                seteSetectedEmployee(employee.value);
              }
            }}
            onInputChange={(event, employee) => {
              setInputValue(employee);
            }}
          />

          {/* Show the attendance record */}
          {selectedEmployee && (
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                marginTop: "1.5rem",
                alignSelf: "center",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              Selected Employee:{" "}
              {(() => {
                const employee = employeeData.find(
                  (employee) => employee._id === selectedEmployee
                );
                if (employee) {
                  return `${employee.firstName} ${employee.lastName}`;
                } else {
                  return "Employee not found";
                }
              })()}
            </Typography>
          )}

          {selectedEmployee && (
            <Paper
              sx={{
                width: "100%",
                overflow: "hidden",
                marginTop: "2rem",
                marginBottom: "3rem",
              }}
            >
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {recordColumns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            minWidth: column.minWidth,
                            backgroundColor: "lightblue",
                            fontSize: "1.1rem",
                            fontWeight: "bold",
                          }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {records
                      .slice(
                        recordPage * rowsPerRecordPage,
                        recordPage * rowsPerRecordPage + rowsPerRecordPage
                      )
                      .map((row, index) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={index}
                          >
                            {recordColumns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
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
                rowsPerPage={rowsPerRecordPage}
                page={recordPage}
                onPageChange={handleChangeRecordPage}
                onRowsPerPageChange={handleChangeRowsPerRecordPage}
              />
            </Paper>
          )}

          <Divider></Divider>
        </Box>
      </Box>
    </>
  );
}

export default EmployeeManagement;
