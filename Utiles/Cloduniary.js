// const cloudinary = require("cloudinary");
// const dotenv=require("dotenv")
// dotenv.config()
// // Configuration
// cloudinary.config({
//   cloud_name:process.env.cloud_name,
//   api_key: process.env.api_key,
//   api_secret:process.env.api_secret,
// });
// // Upload an image
//  async function CloudinaryFileUpload(file){
// const uploadResult = await cloudinary.uploader.upload(
//   file,{resource_type: "video", }
// );
// console.log(uploadResult)
// return uploadResult.url
//  }

// module.exports={CloudinaryFileUpload}
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

// Upload video from buffer
function CloudinaryFileUploadFromBuffer(fileBuffer, originalName) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "video", public_id: originalName.split(".")[0] }, 
      (err, result) => {
        if (err) reject(err);
        else resolve(result.url);
      }
    );
    stream.end(fileBuffer);
  });
}


module.exports = { CloudinaryFileUploadFromBuffer };
