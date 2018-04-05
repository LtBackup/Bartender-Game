const db = require("../models");

//Defining methods for the bartendersController
module.exports = {

  login: function (req, res, next) {
    console.log("this is the login route");
  },

  getDrinks: function (req, res, next) {
    let user = req.params.username;
    db.Bartender.findOne({ 'username': user })
      .then(dbModel => {
        res.json(dbModel) 
      })
      .catch(err => res.status(422).json(err));
  },

  create: function (req, res, next) {
      console.log("trying to send back new bar!");
      return res.redirect("/bar");
  },
  update: function (req, res) {
    // console.log("==============================");
    // console.log("req.body", req.body);
    // console.log("req.body.drinkname", req.body.drinkName);
    // console.log("req.params.username", req.params.username);
    let user = req.params.username;
    let drinkQuery = req.body.drinkData.strDrink;
    let drinkPic = req.body.drinkData.strDrinkThumb;
    let passedIngredients = req.body.drinkIngredients;
    let instructions = req.body.drinkData.strInstructions;
    let link = "https://www.thecocktaildb.com/drink.php?c=" + req.body.drinkData.idDrink;
    let newDrink = {
      drinkName: drinkQuery,
      timesMade: 1,
      drinkImage: drinkPic,
      drinkIngredients: passedIngredients,
      drinkInstructions: instructions,
      drinkLink: link
    };
    db.Bartender.findOne({ 'username': user, 'inProgress.drinkName': drinkQuery })
      .then(dbModel => {
        if (dbModel) {
          db.Bartender
            .findOneAndUpdate({ 'username': user, 'inProgress.drinkName': drinkQuery },
              { '$inc': { 'inProgress.$.timesMade': 1 } })
            .then(dbModel => { res.json(dbModel) })
            .catch(err => res.status(422).json(err));
        } else {
          db.Bartender
            .findOneAndUpdate({ 'username': user }, { '$push': { 'inProgress': newDrink } })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
        }
      })
      .catch(err => res.status(422).json(err));
  },
  logout: function (req, res) {
    req.logout();
    res.redirect('/');
  }
};