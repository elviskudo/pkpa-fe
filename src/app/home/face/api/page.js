import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), 'public/images/target');

export default async (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = uploadDir;
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Form parsing error:', err); // Tambahkan log untuk debugging
      return res.status(500).json({ error: 'Something went wrong during form parsing' });
    }

    if (!files.file || files.file.length === 0) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const oldPath = files.file[0].filepath;
    const newPath = path.join(uploadDir, files.file[0].originalFilename);

    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        console.error('File renaming error:', err); // Tambahkan log untuk debugging
        return res.status(500).json({ error: 'Failed to save the file' });
      }

      res.status(200).json({ message: 'File uploaded successfully' });
    });
  });
};