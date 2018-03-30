const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://LtBackup:hottamale@ds123129.mlab.com:23129/heroku_3g8np357"
);

const bartenderSeed = [
  {
    username: "bobby",
    password: "password",
    classicsMastered: false,
    inProgress: [{drinkName: "Manhattan", timesMade: 2}, {drinkName:"Daiquiri", timesMade: 1}],
    drinksMastered: [{drinkName: "Old Fashioned", timesMade: 3}]
  },
  {
    username: "robby",
    password: "password",
    classicsMastered: false,
    inProgress: [{drinkName: "Manhattan", timesMade: 2}, {drinkName:"Daiquiri", timesMade: 1}],
    drinksMastered: [{drinkName: "Old Fashioned", timesMade: 3}]
  },
  {
    username: "robby the sheath",
    password: "password",
    classicsMastered: false,
    inProgress: [{drinkName: "Manhattan", timesMade: 2}, {drinkName:"Daiquiri", timesMade: 1}],
    drinksMastered: [{drinkName: "Old Fashioned", timesMade: 3}]
  },
  {
    username: "master",
    password: "master",
    classicsMastered: true,
    inProgress: [{drinkName: "Manhattan", timesMade: 2}, {drinkName:"Daiquiri", timesMade: 1}],
    drinksMastered: [{drinkName: "Old Fashioned", timesMade: 3}]
  }
];

db.Bartender
  .remove({})
  .then(() => db.Bartender.collection.insertMany(bartenderSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
