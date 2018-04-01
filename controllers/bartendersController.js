const db = require("../models");

//Defining methods for the bartendersController
module.exports = {
  // getAll: function(req, res) {
  //   db.Bartender
  //     .find({})
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  login: function (req, res) {
    console.log(req.body.username);
    db.Bartender
      .findOne({ username: req.body.username })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByUsername: function (req, res) {
    db.Bartender
      .findOne({ username: req.params.username })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Bartender
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    console.log("==============================");
    console.log("req.body", req.body);
    console.log("req.body.drinkname", req.body.drinkName);
    console.log("req.params.username", req.params.username);
    let user = req.params.username;
    let drinkQuery = req.body.drinkName;
    let newDrink = { drinkName: drinkQuery, timesMade: 1 };
    db.Bartender.findOne({ 'username': user, 'inProgress.drinkName': drinkQuery })
      .then(dbModel => {
        console.log(dbModel);
        if (dbModel) {
          db.Bartender
            .findOneAndUpdate({ 'username': user, 'inProgress.drinkName': drinkQuery },
              { '$inc': { 'inProgress.$.timesMade': 1 } })
            .then(dbModel => { res.json(dbModel) })
            .catch(err => res.status(422).json(err));
        } else {
          console.log("new drink");
          db.Bartender
            .findOneAndUpdate({ 'username': user }, { '$push': { 'inProgress': newDrink } })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
        }
      })
      .catch(err => res.status(422).json(err));
  }
};