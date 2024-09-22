import { v2 as cloudinary } from "cloudinary";

const fs = require("fs");

(async function () {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });

  const uploadOnCloudinary = async (localFilePath) => {
    try {
      if (!localFilePath) return;

      // upload the file to cloudinary
      const result = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto",
      });

      // file uploaded successfully
      console.log(result.url);
      console.log("File has been uploaded successfully!");

      //   fs.unlinkSync(localFilePath || "");

      return result;
    } catch (error) {
      // remove file locally saved temporary file if it fails to upload

      fs.unlinkSync(localFilePath || "");
      return null;
    }
  };

  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(
      "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
      {
        public_id: "shoes",
      }
    )
    .catch((error) => {
      console.log(error);
    });

  console.log(uploadResult);

  // Optimize delivery by resizing and applying auto-format and auto-quality
  const optimizeUrl = cloudinary.url("shoes", {
    fetch_format: "auto",
    quality: "auto",
  });

  console.log(optimizeUrl);
})();
