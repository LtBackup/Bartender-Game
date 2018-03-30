const db = require("../models");

//Defining methods for the bartendersController
module.exports = {
  getAll: function(req, res) {
    db.Bartender
      .find({})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  login: function(req, res) {
    console.log(req.body.username);
    db.Bartender
      .findOne({ username: req.body.username })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByUsername: function(req, res) {
    db.Bartender
      .findOne({ username: req.params.username })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Bartender
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Bartender
      .findOneAndUpdate({ username: req.params.username }, req.body)
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
