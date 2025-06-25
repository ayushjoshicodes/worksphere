// import jwt from 'jsonwebtoken'
// import User from '../models/User.js'
// const verifyUser = async(req,res,next)=>{
// try{
//     const token= req.headers.authorization.split(' ')[1]
//     if(!token){
//         return res.status(404).json({success:false,error:"Token not provided"})
//     }

//     const decoded= jwt.verify(token,process.env.JWT_KEY)
//     if(!decoded){
//         return res.status(404).json({success:false,error:"Token not Valid"})
//     }
    
//     const user=await User.findById({_id:decoded._id}).select('-password')

//     if(!user){
//         return res.status(404).json({success:false,error:"User not found"})
//     }

//     req.user=user
//     next()
// } catch(error){
//     return res.status(404).json({success:false,error:"server error in verification"})
// }
// }

// export default verifyUser

import jwt from "jsonwebtoken";
import User from "../models/User.js";

const verifyUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    //console.log("Authorization Header:", req.headers.authorization);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, error: "Token not provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (!decoded) {
      return res.status(401).json({ success: false, error: "Token not valid" });
    }

    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res
      .status(401)
      .json({ success: false, error: "Authentication failed" });
  }
};

export default verifyUser;
