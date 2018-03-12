// Import passport
const passport = require('passport');

module.exports = (app) => {
  // Route Handler for Auth
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  // Route for auth/google/callback
  app.get('/auth/google/callback', passport.authenticate('google'));

  // Route for logout
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });

  // Route for testing
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};