// utils/cloudinary.js
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads", // optional Cloudinary folder
    allowed_formats: ["jpg", "png", "jpeg", "pdf"], // add more if needed
    public_id: (req, file) => `${Date.now()}-${file.originalname}`, // optional custom name
  },
});

export { cloudinary, storage };
