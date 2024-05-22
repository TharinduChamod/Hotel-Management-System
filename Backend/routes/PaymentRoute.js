const express = require("express");
const router = express.Router();
const { Payment } = require("../models/Payments");
const moment = require("moment-timezone");

router.post("/add-payment", async (req, res) => {
  try {
    // Formatting the current Date
    const date = new Date();
    date.setHours(5, 30, 0, 0);
    // const formattedDate = moment.tz(date, "Asia/Colombo").toISOString();
    const formattedDate = date.toISOString();

    console.log("New Record");
    const newPayment = new Payment({
      name: req.body.name,
      employeeId: req.body.employeeId,
      date: formattedDate,
      payment: req.body.payment,
    });

    // Save the payment to the database
    const recordPayment = await newPayment.save();

    res.status(201).json(recordPayment);

    // Catch the error
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Get all the Payment Data
router.get("/all", async (req, res) => {
  try {
    const payments = await Payment.find({});
    res.status(201).json(payments);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Get Payement Details of a given employee
router.post("/get-employee-payments", async (req, res) => {
  try {
    let existingRecords = await Payment.find({
      employeeId: req.body.employeeId,
    });

    return res.status(200).json(existingRecords);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
