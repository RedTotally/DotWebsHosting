import fs from 'fs';
import path from 'path';

const uploadDir = path.join(process.cwd(), 'uploads'); 

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const username = req.body.toLowerCase();

    const userDir = path.join(uploadDir, username);
    const filesDir = path.join(userDir, 'files');

    try {
      if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir, { recursive: true }); 
      }
      if (!fs.existsSync(filesDir)) {
        fs.mkdirSync(filesDir, { recursive: true }); 
      }

      return res.status(201).json({ message: 'User registered and directories created.' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Error creating directories' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
