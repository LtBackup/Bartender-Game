//const jwt = require('jsonwebtoken');
const Bartender = require('mongoose').model('Bartender');
const PassportLocalStrategy = require('passport-local').Strategy;
console.log("in Login Strategy");

/**
 * Return the Passport Local Strategy object.
 */
const LoginStrategy = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
},
(req, username, password, done) => {
  const bartenderData = {
    username: username.trim(),
    password: password.trim(),
  };
  console.log("in login strategy");

// find a bartender by username 
return Bartender.findOne({ username: BartenderData.username }, (err, bartender) => {
  if (err) { return done(err); }

  if (!bartender) {
    const error = new Error('Incorrect email or password');
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

    return done(null, data);
  });
});
});
module.exports = LoginStrategy;
