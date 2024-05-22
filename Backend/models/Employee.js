const mongoose = require("mongoose");


const EmployeeSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function(v) {
          return /\d{10}/.test(v); // Assuming mobile number should be 10 digits
        },
        message: props => `${props.value} is not a valid phone number!`
      }
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function(v) {
          // Basic email validation
          return /\S+@\S+\.\S+/.test(v);
        },
        message: props => `${props.value} is not a valid email address!`
      }
    },
    birthday: {
      type: Date,
      required: true
    }
  });

// Creating the user model
const Employee = mongoose.model("employee", EmployeeSchema);

module.exports = {Employee};