//import { S3 } from "@aws-sdk/client-s3";
const S3 = require('@aws-sdk/client-s3').S3
require('dotenv').config();
const s3Client = new S3({
    //forcePathStyle: false, // Configures to use subdomain/virtual calling format.
    //endpoint: "https://nyc3.digitaloceanspaces.com",
   
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      sessionToken: process.env.AWS_SESSION_TOKEN
    }
});

module.exports = { s3Client };