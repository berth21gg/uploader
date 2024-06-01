const {ListObjectsCommand} = require('@aws-sdk/client-s3');
const {s3Client} = require('./s3Client.js');
require('dotenv').config();

const bucketParams = { Bucket: process.env.S3_BUCKET_NAME, Prefix: process.env.S3_BUCKET_FOLDER };

module.exports = listObjects = async () => {
  try {
    const data = await s3Client.send(new ListObjectsCommand(bucketParams));
    //console.log("Success", data);
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};