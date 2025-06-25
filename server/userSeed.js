// Now backend is getting started
import User from "./models/User.js";
import bcrypt from "bcrypt";
import connectToDatabase from "./db/db.js";

const userRegister = async () => {
   await connectToDatabase();
  try {
    const hashPassword = await bcrypt.hash("admin", 10);
    const newUser = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashPassword,
      role: "admin",
    });
    await newUser.save();
  } catch (error) {
    console.log(error);
  }
};

userRegister();


// import bcrypt from "bcrypt";
// import mongoose from "mongoose";
// import connectToDatabase from "./db/db.js";
// import User from "./models/User.js";

// async function userRegister() {
//   try {
//     await connectToDatabase(); // don’t drop the await!

//     const hash = await bcrypt.hash("admin", 10);

//     const userDoc = new User({
//       name: "Admin",
//       email: "admin@gmail.com",
//       password: hash,
//       role: "admin",
//     });

//     await userDoc.save();
//     console.log("User saved:", userDoc._id);
//   } catch (err) {
//     console.error("❌  Error:", err);
//   } finally {
//     await mongoose.disconnect(); // flush buffers & close nicely
//   }
// }

// userRegister();

