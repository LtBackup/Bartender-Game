const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bartenderSchema = new Schema({
  username: { type: String,
    required: "Username is Required",
    unique: true },
  password: { type: String,
    required: "Password is Required",
    validate: [
      function(input) {
        return input.length >= 6;
      },
    "Password needs to be at least 6 characters long"
  ] },
  classicsMastered: { type: Boolean, default: false },
  //object to contain {name: "drinkName", timesMade: 1}
  inProgress: [Object],
  //hashtable to store drink name as the key, and boolean for mastery
  //[{type: Schema.Types.Mixed, default: {}}]
  //object to contain {name: "drinkName", timesMade: 1}
  drinksMastered: [Object]
});

const Bartender = mongoose.model("Bartender", bartenderSchema);

module.exports = Bartender;
