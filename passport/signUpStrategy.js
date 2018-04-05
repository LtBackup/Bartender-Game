const passport = require("passport");
const PassportLocalStrategy = require('passport-local').Strategy;
const db = require("../models");


/**
 * Return the Passport Local Strategy object.
 */
const SignUpStrategy = new PassportLocalStrategy({
  usernameField: 'username',
}, (req, username, password, done) => {
  const bartenderData = {
    username: username.trim(),
  };

  const newBartender = new db(bartenderData);
  newBartender.save((err) => {
    if (err) { return done(err); }

    return done(null);
  });
});

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports = SignUpStrategy;