import Employee from '../models/employee.js'
import Leave from '../models/leave.js'

const addLeave = async (req, res) => {
     try {
       const { userId, leaveType, startDate, endDate, reason } = req.body;
       const employee = await Employee.findOne({userId})

       const newLeave = new Leave({
         employeeId: employee._id,
         leaveType,
         startDate,
         endDate,
         reason,
       });

       await newLeave.save();

       return res.status(200).json({ success: true });
     } catch (error) {
       return res.status(500).json({
         success: false,
         error: "leave add server error",
       });
     }
}

const getLeave = async (req, res) => {
  try{
    const id = req.params.id;
    console.log(id);
    let leaves = await Leave.find({ employeeId: id })
    // .populate(
    //   "employeeId",
    //   "employeeId"
    // );
   
    if(!leaves || leaves.length === 0){
      
      const employee = await Employee.findOne({userId: id})
       
     if(employee)leaves = await Leave.find({employeeId: employee._id})
      
       
    }
    // const employee = await Employee.findOne({userId: id})

    // const leaves = await Leave.find({employeeId: employee._id})

    return res.status(200).json({success: true , leaves})
  }catch(error){
    return res.status(500).json({
      success: false,
      error: "leave add server error",
    });
  }
}

const getLeaves = async (req ,res) => {
   try {
     const leaves = await Leave.find().populate({
       path: "employeeId",
       populate: [
         {
           path: "department",
           select: "dep_name",
         },
         {
           path: "userId", 
           select: "name",
         },
       ],
     });

     return res.status(200).json({ success: true, leaves });
   } catch (error) {
     return res.status(500).json({
       success: false,
       error: "leave add server error",
     });
   }
}

const getLeaveDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.findById({_id: id}).populate({
      path: "employeeId",
      populate: [
        {
          path: "department",
          select: "dep_name",
        },
        {
          path: "userId",
          select: "name , profileImage",
        },
      ],
    });

    return res.status(200).json({ success: true, leave });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "leave add server error",
    });
  }
} 

const updateLeave = async ( req, res) => {
  try {

    const {id} = req.params;
    
    
    const leave = await Leave.findByIdAndUpdate({_id: id}, {status: req.body.status})

    if(!leave){
      return res.status(404).json({
        success: false,
        error: "leave not founded",
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {

        return res.status(500).json({
          success: false,
          error: "leave add server error",
        });

  }
}

export { addLeave, getLeave, getLeaves, getLeaveDetail , updateLeave};