//const jwt = require('jsonwebtoken');
const Bartender = require('mongoose').model('Bartender');
const PassportLocalStrategy = require('passport-local').Strategy;
const passport = require("passport");
console.log("in Login Strategy");

/**
 * Return the Passport Local Strategy object.
 */
const LoginStrategy = new PassportLocalStrategy({
  usernameField: 'username',
},
(req, username, password, done) => {
  const bartenderData = {
    username: username.trim(),
  };
  console.log("inner login strategy");

// find a bartender by username 
return Bartender.findOne({ username: bartenderData.username }, (err, bartender) => {
  if (err) { return done(err); }

  if (!bartender) {
    const error = new Error('Incorrect username or password');
    error.name = 'IncorrectCredentialsError';

    return done(error);
  }

  // check if a hashed user's password is equal to a value saved in the database
  return bartender.comparePassword(bartenderData.password, (passwordErr, isMatch) => {
    if (err) { return done(err); }

    if (!isMatch) {
      const error = new Error('Incorrect email or password');
      error.name = 'IncorrectCredentialsError';

      return done(error);
    }

    // const payload = {
    //   sub: bartender._id
    // };

    // // create a token string
    // const token = jwt.sign(payload, "getting turbo");
    const data = {
      name: bartender.name
    };
    console.log("data", data);
    return done(null, data);
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
