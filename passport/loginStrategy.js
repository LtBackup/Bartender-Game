const PassportLocalStrategy = require('passport-local').Strategy;
const passport = require("passport");
const db = require("../models");
console.log("in Login Strategy");

/**
 * Return the Passport Local Strategy object.
 */
const LoginStrategy = new PassportLocalStrategy({
  usernameField: 'username',
},
(username, password, done) => {
  const bartenderData = {
    username: username.trim(),
  };
  console.log("inner login strategy");

// find a bartender by username 
db.findOne({ username: bartenderData.username }, (err, bartender) => {
  if (err) { return done(err); }

  if (!bartender) {
    const error = new Error('Incorrect username or password');
    error.name = 'IncorrectCredentialsError';

    return done(error);
  }

  // check if a hashed user's password is equal to a value saved in the database
  bartender.comparePassword(bartenderData.password, (passwordErr, isMatch) => {
    if (err) { return done(err); }

    if (!isMatch) {
      const error = new Error('Incorrect email or password');
      error.name = 'IncorrectCredentialsError';

      return done(error);
    }

    return done(null, bartender);
  });
});
});

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports = LoginStrategy;
