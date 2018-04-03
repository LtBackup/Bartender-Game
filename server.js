const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const passport = require("passport");
var session = require("express-session");
const app = express();


const PORT = process.env.PORT || 3001;

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(routes);

//Passport
app.use(session({ secret: "getting turbo", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// load passport strategies
const LoginStrategy = require('./passport/LoginStrategy');
const SignUpStrategy = require('./passport/SignUpStrategy');
passport.use('LoginStrategy', LoginStrategy);
passport.use('SignUpStrategy', SignUpStrategy);
console.log(passport);


// Set up promises with mongoose
mongoose.Promise = global.Promise;

// const DEV = "mongodb://localhost/reactreadinglist";
const PRODUCTION = "mongodb://LtBackup:hottamale@ds123129.mlab.com:23129/heroku_3g8np357";

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || PRODUCTION
);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
