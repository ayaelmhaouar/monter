// app.js (backend)
const express = require('express');
const cors = require('cors');

const app = express();

// 🟢 Configure CORS BEFORE any routes
app.use(cors({
  origin: 'http://localhost:5173',  // React frontend
  credentials: true,                // Allow cookies or auth headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 📌 Parse JSON
app.use(express.json());

// 🟦 Test API route
app.get('/', (req, res) => {
  res.json({ message: 'Backend working!' });
});

// 🟩 Example: Register endpoint
app.post('/api/register', (req, res) => {
  console.log(req.body);
  res.json({ message: 'Registration successful' });
});

// 🟩 Example: Login endpoint
app.post('/api/login', (req, res) => {
  console.log(req.body);
  res.json({ message: 'Login successful' });
});

// 🟩 Example: Contact form endpoint
app.post('/api/contact', (req, res) => {
  console.log(req.body);
  res.json({ message: 'Message received successfully!' });
});

// 🟣 Start server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
