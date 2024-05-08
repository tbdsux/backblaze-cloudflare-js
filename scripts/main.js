import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from "node:fs";

const client = new S3Client({
  endpoint: "https://s3.us-west-002.backblazeb2.com",
  region: "us-west-002",
  credentials: {
    accessKeyId: process.env.BACKBLAZE_API_ID,
    secretAccessKey: process.env.BACKBLAZE_API_KEY,
  },
});

const bucketName = "learntest";

const uploadFile = await client.send(
  new PutObjectCommand({
    Bucket: bucketName,
    Key: "random/testimage.jpg",
    Body: fs.createReadStream("./testimage.jpg"),
    ContentType: "image/jpeg",
  })
);

console.log(uploadFile);
