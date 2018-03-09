// Import Express library
const express = require('express');
// Import Passport modules (We just need the Strategy property)
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// Import keys
const keys = require('./config/keys');
// Create Express app
const app = express();


// Apply a new strategy
passport.use(new GoogleStrategy(
  {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    console.log('access Token', accessToken);
    console.log('refresh Token', refreshToken);
    console.log('Profile', profile);
  }
));

// Route Handler for Auth
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Route for auth/google/callback
app.get('/auth/google/callback', passport.authenticate('google'));

// Bind PORT for Heroku (Dynamic) OR local environment 
const PORT = process.env.PORT || 5000;

// Watch traffic on specified port 
app.listen(PORT);