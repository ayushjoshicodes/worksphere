import express from "express";
import {
  addLeave,
  getLeave,
  getLeaves,
  getLeaveDetail,
  updateLeave
} from "../controllers/leaveController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addLeave);
router.get("/:id" , authMiddleware , getLeave)
router.get("/", authMiddleware, getLeaves);
router.get("/details/:id", authMiddleware, getLeaveDetail);
router.put("/:id" , authMiddleware , updateLeave);


export default router;
