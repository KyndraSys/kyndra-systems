import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API endpoint to receive form submissions
app.post('/api/submissions', (req, res) => {
  const submissionData = req.body;
  
  console.log('Received submission:', submissionData);
  
  // Save to a JSON file
  const filename = `submission-${Date.now()}.json`;
  const filepath = path.join(__dirname, 'submissions', filename);
  
  // Create submissions directory if it doesn't exist
  if (!fs.existsSync(path.join(__dirname, 'submissions'))) {
    fs.mkdirSync(path.join(__dirname, 'submissions'));
  }
  
  // Write the data to file
  fs.writeFileSync(filepath, JSON.stringify(submissionData, null, 2));
  
  res.json({ 
    success: true, 
    message: 'Submission received successfully',
    submissionId: Date.now(),
    filename: filename
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});