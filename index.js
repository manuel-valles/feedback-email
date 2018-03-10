// Import Express library
const express = require('express');
// Import Mongoose
const mongoose = require('mongoose');
// Load keys
const keys = require('./config/keys');

// Import User Config
require('./models/User');
// Import Passport Config
require('./services/passport');

// Connect to the copy/instance of MongoDB
mongoose.connect(keys.mongoURI);

// Create Express app
const app = express();

// Apply routes
require('./routes/authRoutes')(app);

// Bind PORT for Heroku (Dynamic) OR local environment 
const PORT = process.env.PORT || 5000;

// Watch traffic on specified port 
app.listen(PORT);