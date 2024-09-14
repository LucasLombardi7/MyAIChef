import express from 'express';
import path from 'path';
const app = express();
const port = 3000;

const __dirname = path.resolve(); // You can directly use path.resolve() in CommonJS

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});