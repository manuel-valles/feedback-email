// Import Express library
const express = require('express');
// Import Mongoose
const mongoose = require('mongoose');
// Import CookieSession
const cookieSession = require('cookie-session');
// Import Passport
const passport = require('passport');
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

// Use Cookies inside our app
app.use(
  cookieSession({
    // 30 days before it expires
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // Key to encrypt the cookie. Array for multiple keys
    keys: [keys.cookieKey]
  })
);

// Handle authentication using cookies
app.use(passport.initialize());
app.use(passport.session());


// Apply routes
require('./routes/authRoutes')(app);

// Bind PORT for Heroku (Dynamic) OR local environment 
const PORT = process.env.PORT || 5000;

// Watch traffic on specified port 
app.listen(PORT);