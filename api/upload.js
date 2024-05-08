import { PutObjectCommand } from "@aws-sdk/client-s3";
import formidable from "formidable";
import { nanoid } from "nanoid";
import fs from "node:fs";
import { bucketName, s3Client } from "../lib/s3.js";

export const config = {
  api: {
    bodyParser: false,
  },
};

const form = formidable({
  allowEmptyFiles: false,
  keepExtensions: true,
  filename: function (name, ext, part, form) {
    const { originalFilename } = part;
    return originalFilename.replace(/\s/g, "_");
  },
});

/**
 *
 * @param {import("@vercel/node".VercelRequest)} req
 * @param {import("@vercel/node").VercelResponse} res
 * @returns
 */
export default function handler(req, res) {
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method Not Allowed",
    });
  }

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("failed to parse form data:", err);

      res.status(500).json({
        message: "Failed to parse form data",
      });
      return;
    }

    const filesToUpload = files.files;
    if (filesToUpload.length === 0) {
      return res.status(400).json({
        message: "No files uploaded",
      });
    }

    let fileUploadKeys = [];

    for (const file of Array.from(filesToUpload)) {
      let fileKey = nanoid() + "/" + file.newFilename;

      await s3Client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: fileKey,
          Body: fs.createReadStream(file.filepath),
          ContentType: file.mimetype,
        })
      );

      fileUploadKeys.push(
        `https://${bucketName}.s3.us-west-002.backblazeb2.com/${fileKey}`
      );
    }

    return res.status(200).json({
      files: fileUploadKeys,
    });
  });
}
