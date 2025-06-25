import mongoose from "mongoose";
import Employee from "./employee.js";
import Leave from "./leave.js";
import Salary from "./salary.js"
import User from "./User.js";


const departmentSchema = new mongoose.Schema({
  dep_name: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

departmentSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      // Get employees in this department
      const employees = await Employee.find({ department: this._id });

      // Extract employee IDs
      const empIds = employees.map((emp) => emp._id);

      const userIds = employees.map((emp) => emp.userId._id);

      // Delete employees in this department
      await Employee.deleteMany({ department: this._id });

      // Delete leaves of employees in this department
      await Leave.deleteMany({ employeeId: { $in: empIds } });

      // Delete salaries of employees in this department
      await Salary.deleteMany({ employeeId: { $in: empIds } });

      await User.deleteMany({ _id: { $in: userIds } });

      next();
    } catch (error) {
      next(error);
    }
  }
);


const Department = mongoose.model("Department", departmentSchema);

export default Department;
