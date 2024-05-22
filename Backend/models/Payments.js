const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  employeeId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  payment: {
    type: String,
    required: true,
  },
});

// Creating the user model
const Payment = mongoose.model("payment", PaymentSchema);

module.exports = { Payment };
