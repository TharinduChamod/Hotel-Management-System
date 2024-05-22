const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        required: true
      },
      status: {
        type: String,
        enum: ['Present', 'Absent'],
        default: 'Absent'
      },
      marked: {
        type: Boolean,
        default: true
      }
    }
)

const Attendance = mongoose.model("attendance", AttendanceSchema);

module.exports = {Attendance};