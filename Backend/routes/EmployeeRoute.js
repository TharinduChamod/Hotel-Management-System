const express = require("express");
const router = express.Router();
const { Employee } = require("../models/Employee");
const moment = require("moment-timezone");

// Route for Employee registration
router.post("/", async (req, res) => {
  try {
    const adjustedBirthday = moment
      .tz(req.body.birthday, "YYYY/MM/DD", "Asia/Colombo")
      .toDate();

    // Creating a new Employee
    const newUser = new Employee({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      role: req.body.role,
      mobile: req.body.mobile,
      email: req.body.email,
      birthday: adjustedBirthday,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);

    // Catch the error
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Get the all employees data
router.get("/all", async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.status(201).json(employees);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Update Route Employee Data for given Employee
router.post("/update-employee", async (req, res) => {
  try {
    // Get the data from the request
    const adjustedBirthday = new Date(req.body.birthday).toISOString();

    // Get the Existing record
    let existingRecord = await Employee.findOne({
      _id: req.body.employeeId,
    });

    console.log(req.body);
    console.log(existingRecord);

    if (existingRecord) {
      const filter = {
        _id: existingRecord._id,
      };

      const updateDoc = {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          role: req.body.role,
          address: req.body.address,
          mobile: req.body.mobile,
          email: req.body.email,
          birthday: adjustedBirthday,
        },
      };

      await Employee.updateOne(filter, updateDoc);
      return res.status(200).json(existingRecord);
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
