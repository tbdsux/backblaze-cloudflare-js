import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  endpoint: "https://s3.us-west-002.backblazeb2.com",
  region: "us-west-002",
  credentials: {
    accessKeyId: process.env.BACKBLAZE_API_ID,
    secretAccessKey: process.env.BACKBLAZE_API_KEY,
  },
});

const bucketName = "learntest";

export { bucketName, s3Client };
