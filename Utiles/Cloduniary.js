const cloudinary = require("cloudinary");
const dotenv=require("dotenv")
dotenv.config()
// Configuration
cloudinary.config({
  cloud_name:process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret:process.env.api_secret,
});
// Upload an image
 async function CloudinaryFileUpload(file){
const uploadResult = await cloudinary.uploader.upload(
  file,
);

return uploadResult
 }

module.exports={CloudinaryFileUpload}
