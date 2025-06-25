import mongoose from "mongoose";
import Department from "../models/department.js";

const getDepartment = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json({ success: true, departments });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get department server error" });
  }
};


const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;

    const newDep = new Department({
      dep_name,
      description,
    });

    await newDep.save();

    return res.status(200).json({
      success: true,
      department: newDep,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "add department server error",
    });
  }
};

const haveDepartment = async (req, res) => {
  try {
    const { id } = req.params; // /api/department/:id
    const department = await Department.findById(id);

    if (!department) {
      return res.status(404).json({
        success: false,
        error: "department not found",
      });
    }

    return res.status(200).json({
      success: true,
      department,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "get department server error",
    });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;                  // /api/department/:id
    const { dep_name, description } = req.body; // fields coming from the form

    const updatedDep = await Department.findByIdAndUpdate(
      id,                                       // same as { _id: id }
      { dep_name, description },
      { new: true, runValidators: true }        // return updated doc, honor schema
    );

    if (!updatedDep) {
      return res.status(404).json({
        success: false,
        error: 'department not found',
      });
    }

    return res.status(200).json({
      success: true,
      department: updatedDep,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: 'update department server error',
    });
  }
};  

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDep = await Department.findByIdAndDelete(id);
    await deletedDep.deleteOne()

    if (!deletedDep) {
      return res.status(404).json({
        success: false,
        error: "department not found",
      });
    }

    return res.status(200).json({
      success: true,
      deletedDep,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "delete department server error",
    });
  }
};





export {
  addDepartment,
  getDepartment,
  haveDepartment,
  updateDepartment,
  deleteDepartment,
};
