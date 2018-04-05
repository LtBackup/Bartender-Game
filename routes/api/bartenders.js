const router = require("express").Router();
const bartendersController = require("../../controllers/bartendersController");
const passport = require("passport");

//routes that determine which path to call in bartendersController.js
//note that login and create utilize the local strategies of Passport

// Matches with "/api/bartenders"
router.route("/login")
  .post(passport.authenticate('local-signin', 
  {successRedirect: '/bar', failureRedirect: '/'}
  ));

router.route("/create")
  .post(passport.authenticate("local-signup",
  {successRedirect: '/bar', failureRedirect: '/'}
  ));

// Matches with "/api/bartenders/:username"
router.route("/:username")
  .get(bartendersController.getDrinks)
  .put(bartendersController.update);

router.route("/logout")
  .get(bartendersController.logout);

module.exports = router;
