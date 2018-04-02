const Bartender = require('mongoose').model('Bartender');
const PassportLocalStrategy = require('passport-local').Strategy;


/**
 * Return the Passport Local Strategy object.
 */
const SignUpStrategy = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, username, password, done) => {
  const bartenderData = {
    username: username.trim(),
    password: password.trim(),
  };

  const newBartender = new Bartender(bartenderData);
  newBartender.save((err) => {
    if (err) { return done(err); }

    return done(null);
  });
});

module.exports = SignUpStrategy;