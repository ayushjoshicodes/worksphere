import express from 'express'
import { addSalary , getSalary } from "../controllers/salaryController.js";
import authMiddleware from  "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/add", authMiddleware, addSalary);
router.get("/:id", authMiddleware, getSalary);

export default router;
