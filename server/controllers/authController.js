/* import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import bcrypt from 'bcrypt'

const login = async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user= await User.findOne({email})
        if(!user){
            res.status(404).json({success: false, error:"User not found"})
        }

        const isMatch= await bcrypt.compare(password,user.password)
        if(!isMatch){
            res.status(404).json({success:false, error:"Password is incorrect"})
        }
        const token=jwt.sign({_id:user._id, role:user.role},
            process.env.JWT_KEY,{expiresIn:"10d"}
        )
        res.status(200).json({
            success:true, 
            token, 
            user: {_id: user._id,name:user.name,role:user.role},
        })
    } catch(error){
        res.status(500).json({success:false,error:error.message})
    }
}

const verify=(req,res) =>{
    return res.status(200).json({success:true,user:req.user})
}

export {login,verify} */

import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, error: "Password is incorrect" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "10d" }
    );

    // Send response
    return res.status(200).json({
      success: true,
      token,
      user: { _id: user._id, name: user.name, role: user.role },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const verify = (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
};

export { login, verify };
