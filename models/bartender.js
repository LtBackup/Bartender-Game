const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs'),
    SALT_WORK_FACTOR = 10;

const bartenderSchema = new Schema({
  username: {
    type: String,
    trim: true,
    lowercase: true,
    required: "Username is Required",
    unique: true },
  password: { type: String,
    required: "Password is Required",
    validate: [
      function(input) {
        return input.length >= 5;
      },
    "Password needs to be at least 5 characters long"
  ] },
  classicsMastered: { type: Boolean, default: false },
  inProgress: [{
    drinkName: { type: String, default: ""},
    timesMade: {type: Number, default: 1},
    drinkImage: {type: String, default: ""},
    drinkIngredients: [{ingredient: {type: String}, measurement: {type: String}}],
    drinkInstructions: {type: String, default: ""},
    drinkLink: {type: String, default: ""}
  }],
  drinksMastered: []
});

bartenderSchema.pre('save', function(next) {
  let user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, null, function(err, hash) {
          if (err) return next(err);

          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });
});

bartenderSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};

const Bartender = mongoose.model("Bartender", bartenderSchema);

module.exports = Bartender;
