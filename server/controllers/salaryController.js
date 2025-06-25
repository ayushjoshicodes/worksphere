import Salary from "../models/salary.js"
import Employee from "../models/employee.js"
import express from "express"


const addSalary = async (req , res) => {
    try {
        const {employeeId, basicSalary, allowances, deductions, payDate} = req.body

        const totalSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt (deductions)
        const newSalary = new Salary ({
        employeeId, 
        basicSalary, 
        allowances, deductions, 
        netSalary: totalSalary, 
        payDate
        })

        await newSalary.save();
        return res.status(200).json({ success: true });
    }
    catch(error){
        return res.status(500).json({success: false, error: "salary add server error"})
    }
}

// const getSalary = async (req , res) => {
//     try {
     
//       const { id } = req.params.id;
      
//       console.log();
      
      
     
//       let salary = await Salary.find({ employeeId: req.params.id }).populate(
//         "employeeId",
//         "employeeId"
//       );

//       if(!salary || salary.length < 1){
//         const employee = await Employee.findOne({ userId: req.params.id });
//         salary = await Salary.find({ employeeId: employee._id }).populate(
//           "employeeId",
//           "employeeId"
//         );
//       }

//       return res.status(200).json({ success: true  , salary});
//     } catch (error) {
//       return res
//         .status(500)
//         .json({ success: false, error: "salary add server error" });
//     }
// }

const getSalary = async (req, res) => {
  try {
    const id = req.params.id; // ✅ correctly extracting id as string
    
    // First try: direct match
    let salary = await Salary.find({ employeeId: id }).populate(
      "employeeId",
      "employeeId"
    );
    //console.log("Received ID:", id);
    
    

    // Second try: if not found, try using userId → employee mapping
    if (!salary || salary.length < 1) {
      const employee = await Employee.findOne({ userId: id });

      //  {
      //   return res
      //     .status(404)
      //     .json({ success: false, error: "Employee not found" });
      // }

      if (employee) {
        salary = await Salary.find({ employeeId: employee._id }).populate(
          "employeeId",
          "employeeId"
        );
      }

      //console.log(salary);
    }

    return res.status(200).json({ success: true, salary });
  } catch (error) {
    console.error("Salary fetch error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Server error while fetching salary" });
  }
}; 

export {addSalary , getSalary}