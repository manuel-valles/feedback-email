// Import Passport modules (We just need the Strategy property)
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// Import keys
const keys = require('../config/keys');

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