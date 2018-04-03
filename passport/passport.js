const db = require("../models");

module.exports = function (passport) {
    let LocalStrategy = require('passport-local').Strategy;

    passport.use('local-signup', new LocalStrategy(

        {

            usernameField: 'username',

            passwordField: 'password',

            passReqToCallback: true // allows us to pass back the entire request to the callback

        },
        (req, username, password, done) => {
            const bartenderData = {
                username: username.trim(),
                password: password.trim()
            };

            const newBartender = new db.Bartender(bartenderData);
            newBartender.save((err) => {
                if (err) { return done(err); }

                return done(null);
            });
        }));

    passport.use('local-signin', new LocalStrategy(

        {

            usernameField: 'username',

            passwordField: 'password',

            passReqToCallback: true // allows us to pass back the entire request to the callback

        },
        (req, username, password, done) => {
            const bartenderData = {
                username: username.trim(),
                password: password.trim()
            };

            // find a bartender by username 
            db.Bartender.findOne({ username: bartenderData.username }, (err, bartender) => {
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

                    // const data = {
                    //   name: bartender.name
                    // };
                    console.log("matched bartender", bartender);
                    return done(null, bartender);
                });
            });
        }));

        // passport.serializeUser(function(user, done) {
 
        //     done(null, user.id);
         
        // });

        // passport.deserializeUser(function(id, done) {
 
        //     db.Bartender.findById(id).then(function(user) {
         
        //         if (user) {
         
        //             done(null, user.get());
         
        //         } else {
         
        //             done(user.errors, null);
         
        //         }
         
        //     })
        //     .catch(err => console.log(err));

        passport.serializeUser(function(user, cb) {
            cb(null, user);
          });
          
          passport.deserializeUser(function(obj, cb) {
            cb(null, obj);
          });
         

}