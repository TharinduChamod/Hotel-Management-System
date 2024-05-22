const express = require("express");
const router = express.Router();
const { Attendance } = require("../models/Attendance");
const moment = require("moment-timezone");

// Route for the record attendance
router.post("/record", async (req, res) => {
  try {
    // Formatting the current Date
    const date = new Date();
    date.setHours(5, 30, 0, 0);
    // const formattedDate = moment.tz(date, "Asia/Colombo").toISOString();
    const formattedDate = date.toISOString();

    // Check whether there is record available for this user within today
    let existingRecord = await Attendance.findOne({
      employeeId: req.body.employeeId,
      date: formattedDate,
    });

    console.log(existingRecord);

    if (existingRecord) {
      // If a record already exists for today, update the status and return the updated record
      console.log("Existing Record");
      const filter = {
        employeeId: existingRecord.employeeId,
        date: formattedDate,
      };

      const updateDoc = {
        $set: {
          status: req.body.status,
        },
      };

      await Attendance.updateOne(filter, updateDoc);
      return res.status(200).json(existingRecord);
    }

    // Creating a new Employee
    else {
      console.log("New Record");
      const newAttendance = new Attendance({
        employeeId: req.body.employeeId,
        name: req.body.name,
        date: formattedDate,
        status: req.body.status,
      });

      // Save the user to the database
      const recordAttendace = await newAttendance.save();

      res.status(200).json(recordAttendace);
    }

    // Catch the error
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Get single Record for a given ID
router.post("/get-current-status", async (req, res) => {
  try {
    // Formatting the current Date
    const date = new Date();
    date.setHours(5, 30, 0, 0);
    const formattedDate = date.toISOString();

    // Check whether there is record available for this user within today
    let existingRecord = await Attendance.findOne({
      employeeId: req.body.employeeId,
      date: formattedDate,
    });

    if (existingRecord) {
      const data = {
        status: true,
      };
      return res.status(200).json(data);
    }

    // Creating a new Employee
    else {
      const data = {
        status: false,
      };
      return res.status(200).json(data);
    }

    // Catch the error
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Get the total attendance of today
router.get("/today-records", async (req, res) => {
  try {
    // Get the start of today's date
    const today = new Date();
    today.setHours(5, 30, 0, 0); // Set time to 00:00:00 to include the entire day

    // Find records with date equal to today's date
    const recordsToday = await Attendance.find({
      date: today,
      status: "Present",
    });

    // Send the count of records found
    console.log(recordsToday);
    res.status(200).json({ count: recordsToday.length });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Get the total attendance of past week
// Route for finding records for each day over the last 7 days
router.get("/records-last-7-days", async (req, res) => {
  try {
    // Get the start date for the last 7 days
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 6); // Get the date 7 days ago

    // Aggregate pipeline to group by date and calculate the count for each day over the last 7 days
    const recordsLast7Days = await Attendance.aggregate([
      {
        $match: {
          date: { $gte: startDate, $lte: new Date() },
          status: { $eq: "Present" },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 }, // Sort by date in ascending order
      },
    ]);

    // Prepare the response array with count for each day
    const countArray = [];
    const currentDate = new Date(startDate);
    while (currentDate <= new Date()) {
      const formattedDate = currentDate.toISOString().split("T")[0]; // Get date in "YYYY-MM-DD" format
      const count = recordsLast7Days.find((item) => item._id === formattedDate);
      countArray.push({ date: formattedDate, count: count ? count.count : 0 });
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }

    res.status(200).json(countArray);
  } catch (error) {
    // Catch any errors and send an error response
    res.status(400).json({ message: error.message });
  }
});

// Get records for given Employee
router.post("/get-single", async (req, res) => {
  // Get the records
  try {
    let existingRecords = await Attendance.find({
      employeeId: req.body.employeeId,
    });

    return res.status(200).json(existingRecords);

    // Catch the error
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
