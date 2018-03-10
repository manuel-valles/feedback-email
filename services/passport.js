// Import Passport modules (We just need the Strategy property)
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// Import Mongoose library
const mongoose = require('mongoose');
// Import keys
const keys = require('../config/keys');

// Import User model
const User = mongoose.model('users');

// Apply a new strategy
passport.use(new GoogleStrategy(
  {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    // Create a model instance and save it into the DB
    new User({googleId: profile.id}).save();
  }
));