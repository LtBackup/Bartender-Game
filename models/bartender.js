const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bartenderSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  classicsMastered: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
});

const Bartender = mongoose.model("Bartender", bartenderSchema);

module.exports = Bartender;
