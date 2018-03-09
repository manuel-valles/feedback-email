// Import Express library
const express = require('express');
// Import Passport Config
require('./services/passport');
// Create Express app
const app = express();

// Apply routes
require('./routes/authRoutes')(app);

// Bind PORT for Heroku (Dynamic) OR local environment 
const PORT = process.env.PORT || 5000;

// Watch traffic on specified port 
app.listen(PORT);