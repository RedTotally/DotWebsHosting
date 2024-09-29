// pages/api/upload.js
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const form = new formidable.IncomingForm();
  
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    // handle file upload and processing
    res.status(200).send('File uploaded successfully');
  });
};
