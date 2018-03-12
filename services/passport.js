// Import Passport modules (We just need the Strategy property)
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// Import Mongoose library
const mongoose = require('mongoose');
// Import keys
const keys = require('../config/keys');

// Import User model
const User = mongoose.model('users');

// Passport SerializeUser - Set Cookie
passport.serializeUser((user, done) => {
  // user.id for _id in the DB
  done(null, user.id);
});

// Passport DeserializeUser - Turn out the user
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

// Apply a new strategy
passport.use(new GoogleStrategy(
  {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id })
      .then(existingUser => {
        if (existingUser) {
          // We already have a record with the given profile ID
          // (error, user's record)
          done(null, existingUser);
        } else {
          // We don't have a user record with this ID, make a new record
          // [Create a model instance and save it into the DB]
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
  }
));