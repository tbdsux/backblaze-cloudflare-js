import { PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "node:fs";
import { bucketName, s3Client } from "../lib/s3.js";

const uploadFile = await s3Client.send(
  new PutObjectCommand({
    Bucket: bucketName,
    Key: "random/testimage.jpg",
    Body: fs.createReadStream("./testimage.jpg"),
    ContentType: "image/jpeg",
  })
);

console.log(uploadFile);
