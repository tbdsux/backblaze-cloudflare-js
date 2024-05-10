import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { bucketName, s3Client } from "../lib/s3.js";

const removeFile = await s3Client.send(
  new DeleteObjectCommand({
    Bucket: bucketName,
    Key: "random/testimage.jpg",
  })
);

console.log(removeFile);
