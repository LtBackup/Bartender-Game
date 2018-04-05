const db = require("../models");

//Defining methods for the bartendersController
module.exports = {

  login: function (req, res, next) {
    console.log("this is the login route");
  },

  /**
  * gets all the mixed drink values for the corresponding user
  *
  * @param {string} username to find drinks for
  * 
  * @returns the DB document
  */
  getDrinks: function (req, res, next) {
    let user = req.params.username;
    db.Bartender.findOne({ 'username': user })
      .then(dbModel => {
        res.json(dbModel) 
      })
      .catch(err => res.status(422).json(err));
  },

  create: function (req, res, next) {
    console.log("this is the create route");
  },
  
  /**
  * Saves a variety of drink data for each new drink mixed, or increments the timesMade value if already mixed
  *
  * @param {object} that contains all the drink information
  * 
  * @returns the DB document
  */
  update: function (req, res) {
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

  /**
* logs the user out
* 
* @returns a redirect to the home page
*/
  logout: function (req, res) {
    req.logout();
    res.redirect('/');
  }
};