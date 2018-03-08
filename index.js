// Import Express library
const express = require('express');
// Create Express app
const app = express();

// Route handler
app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

// Bind PORT for Heroku (Dynamic) OR local environment 
const PORT = process.env.PORT || 5000;

// Watch traffic on specified port 
app.listen(PORT);