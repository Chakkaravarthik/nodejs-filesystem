import express from 'express';
import fs from 'fs';
import path from 'path';

const server = express();
const port = 8000;

// Middleware to parse JSON request bodies
server.use(express.json());

// Ensure directory exists
const directory = 'NODE TASK';
if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory, { recursive: true });
}

server.post('/CreateFile', (req, res) => {
  // Use ISO string format for the file name
  const fileContent = Date.now().toString();

  fs.writeFile(`NODE TASK/${new Date().toISOString().replace(/:/g, '-')}.txt`, fileContent, (err) => {
    if (err) {
      console.error('Error creating file:', err);
      return res.status(500).json({ message: 'Error creating file.' });
    }
    console.log('File created successfully');
    res.status(201).json({ message: 'File created successfully' });
  });
});

server.get('/CreateFile', (req, res) => {
    const directory = "NODE TASK";

    try {
        // Synchronously read the contents of the directory
        const files = fs.readdirSync(directory);

        // Send the list of files as a response
        res.status(200).json({ files });
    } catch (err) {
        console.error('Error reading directory:', err);
        res.status(500).json({ error: 'Error reading directory' });
    }
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
