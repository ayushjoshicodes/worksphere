// import express from "express";
// import authMiddleware from "../middleware/authMiddleware.js";
// import {
//   addEmployee, upload
// } from "../controllers/employeeController.js";

// const router = express.Router();

// router.post("/add", authMiddleware, upload.single("image") ,addEmployee);
// // router.get("/", authMiddleware, getDepartment);
// // router.get("/:id", authMiddleware, haveDepartment);
// // router.put("/:id", authMiddleware, updateDepartment);
// // router.delete("/:id", authMiddleware, deleteDepartment);

// export default router;

// routes/employee.js
import express from 'express';
import {
  addEmployee,
  upload,
  getEmployees,
  getEmployee,
  updateEmployee,
  fetchEmployeesByDepId,
} from "../controllers/employeeController.js";
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();


router.post(
  "/add",
  authMiddleware,
  upload.single("image"), // or .none() if no file upload
  addEmployee
);

router.get("/:id", authMiddleware, getEmployee);

router.get('/', authMiddleware, getEmployees);

router.put("/:id", authMiddleware, updateEmployee);

router.get("/department/:id", authMiddleware, fetchEmployeesByDepId);

export default router;

