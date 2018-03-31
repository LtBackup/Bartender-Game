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
    //const drinkQuery = req.body.drinkName;
    console.log("==============================");
    console.log("req.body", req.body);
    console.log("req.body.drinkname", req.body.drinkName);
    console.log("req.params.username", req.params.username);

    let drinkQuery = req.body.drinkName;
    db.Bartender
      .findOneAndUpdate({ username: req.params.username, 'inProgress.drinkName': drinkQuery },
        { '$inc': { 'inProgress.$.timesMade': 1 } }
      )
      .then(res => {
        console.log(res);
        if (!res) {
          db.Bartender
            .findOneAndUpdate({ username: req.params.username },
              {
                '$push': { 'inProgress': { 'drinkName': req.body.drinkName, 'timesMade': 1 } }
              }
            );
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
  // remove: function(req, res) {
  //   db.Bartender
  //     .findById({ username: req.params.username })
  //     .then(dbModel => dbModel.remove())
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  //  }
};
