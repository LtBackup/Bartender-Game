const router = require("express").Router();
const bartendersController = require("../../controllers/bartendersController");
const passport = require("passport");

// Matches with "/api/bartenders"
router.route("/login")
  .post(passport.authenticate('local-signin', 
  {successRedirect: '/bar', failureRedirect: '/'}
  // (req, res) => {
  //   console.log("in the /login route", req);
  //   res.send("success");
  // }
  ));

router.route("/create")
  .post(passport.authenticate("local-signup"), (req, res) => {
    console.log("signup here", res.data);
    res.send("SUCCESS!");
  });

// Matches with "/api/bartenders/:username"
router.route("/:username")
  //.get(bartendersController.findByUsername)
  .put(bartendersController.update);

// function isLoggedIn(req, res, next) {
//   console.log(req);
//   if (req.isAuthenticated())

//     return next();

//   res.redirect('/');

// }

module.exports = router;
