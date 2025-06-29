import multer from "multer";
import { storage } from "../utils/cloudinary.js";
import Employee from "../models/employee.js";
import User from "../models/User.js";
import Department from "../models/department.js";
import bcrypt from "bcrypt";
import path from "path";
import mongoose from "mongoose";
import { log } from "console";

// ------------------- File Upload Setup -------------------
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

const upload = multer({ storage });

// ------------------- Add Employee -------------------
const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;

    // Validate department ObjectId
    if (!mongoose.Types.ObjectId.isValid(department)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid department ID" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "User already registered as employee" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      profileImage: req.file ? req.file.path : "",
    });

    const savedUser = await newUser.save();

    const newEmployee = new Employee({
      userId: savedUser._id,
      department,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,

      salary,
    });

    await newEmployee.save();

    
    

    return res.status(200).json({ success: true, message: "Employee created" });
  } catch (error) {
    console.error("❌ Error in addEmployee:", error);
    return res
      .status(500)
      .json({ success: false, error: "Server error in adding employee" });
  }
};

// ------------------- Get Employees -------------------
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate('userId').populate('department')
      
      
      

    res.status(200).json({ success: true, employees });
  } catch (err) {
    console.error("❌ Error in getEmployees:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// const getEmployee = async (req, res) => {
    
//   try {  
//     const { id } = req.params;
//     const employee = await Employee.findById({_id: id})
//     .populate("userId",{password: 0})
//     .populate("department");

//      return res.status(200).json({success: true , employee});
//   }
//   catch(err){
//     console.error("❌ Error in getEmployee:", err);
//     return res.status(500).json({ success: false, err: "Server error" });
//   }
     
// }

const getEmployee = async (req, res) => {
  const { id } = req.params;
  
  try {
    let employee;

    employee = await Employee.findById({ _id: id })
      .populate("userId", { password: 0 })
      .populate("department");

    if (!employee) {
      employee = await Employee.findOne({ userId: id })
        .populate("userId", { password: 0 })
        .populate("department");
    }

    return res.status(200).json({ success: true, employee });
  } catch (error) {
    return res.status(500).json({ success: false, error: "server error" });
  }
};

const updateEmployee = async (req , res) => {
  try {
    const {id} = req.params
    const {
      name,
      maritalStatus,
      designation,
      department,
      salary,
     
    } = req.body;

    const employee = await Employee.findById({_id: id});

    if(!employee){
          return res
            .status(500)
            .json({ success: false, error: "No Employee Found" });

    }

    const user = await User.findById({ _id: employee.userId });

    if (!user) {
      return res
        .status(500)
        .json({ success: false, error: "No User Found" });
    }

    const updateUser = await User.findByIdAndUpdate({_id: employee.userId},{name});
    const updateEmployee = await Employee.findByIdAndUpdate(
      { _id: id },
      {
        maritalStatus,
        designation,
        department,
        salary,
      }
    );

    if(!updateEmployee || !updateUser){
          return res
            .status(404)
            .json({ success: false, error: "Update Employee Failes!!!" });

    }
    return res.status(200).json({ success: true, message: "employee updated" });

  } catch (error) {
    return res.status(500).json({success: false , error: "Update Employee Failes!!!"})
  }
}

const fetchEmployeesByDepId = async (req , res) => {
   try {  
    const { id } = req.params;
    const employees = await Employee.find({ department: id }).populate('userId')
   

     return res.status(200).json({success: true , employees});
  }
  catch(err){
    console.error("❌ Error in getEmployee:", err);
    return res.status(500).json({ success: false, err: "Server error" });
  }
};

export {
  addEmployee,
  upload,
  getEmployees,
  getEmployee,
  updateEmployee,
  fetchEmployeesByDepId,
};
