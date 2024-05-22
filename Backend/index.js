require("dotenv").config();

// Importing Express JS
const express = require("express");
const app = express();

// Importing CORS
const cors = require("cors");

// Import Database Connection
const connection = require("./database");

// Import Routes
const userRoutes = require("./routes/users");
const authRoute = require("./routes/auth");
const EmployeeRoute = require("./routes/EmployeeRoute");
const AttendanceRoute = require("./routes/AttendanceRoute");
const PaymentRoute = require("./routes/PaymentRoute");

// Database Connection
connection();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoute);
app.use("/api/employee", EmployeeRoute);
app.use("/api/attendance", AttendanceRoute);
app.use("/api/payments", PaymentRoute);

// Test route
app.get("/test", (req, res) => {
  console.log(req.body);
  res.status(200).send("Received GET request to test Route");
});

// Setting the PORT (Default is set to the 5000)
const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on ${port}`));
