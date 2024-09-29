import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = new IncomingForm();
  const uploadDir = path.join(process.cwd(), "uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  form.uploadDir = uploadDir;
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "File upload failed" });
    }

    const filePath = path.join(uploadDir, files.file.newFilename);
    fs.renameSync(files.file.filepath, filePath);

    return res
      .status(200)
      .json({ message: "File uploaded successfully", filePath });
  });
}
