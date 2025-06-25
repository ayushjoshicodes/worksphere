import mongoose from "mongoose";

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.log(error);
    }
}

export default connectToDatabase

// db/db.js
// import mongoose from 'mongoose';

// const connectToDatabase = async () => {
//   const MONGO_URI = process.env.MONGO_URI;
//   if (!MONGO_URI) {
//     throw new Error("❌ MONGO_URI is not defined in environment variables");
//   }

//   await mongoose.connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   console.log("✅ Connected to MongoDB");
// };

// export default connectToDatabase;
