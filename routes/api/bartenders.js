const router = require("express").Router();
const bartendersController = require("../../controllers/bartendersController");

// Matches with "/api/bartenders"
router.route("/login")
  .get(bartendersController.getAll)
  .post(bartendersController.login);

router.route("/create")
  .get(bartendersController.getAll)
  .post(bartendersController.create);

// Matches with "/api/bartenders/:id"
router.route("/:username")
  .get(bartendersController.findByUsername)
  .put(bartendersController.update);
  //.delete(bartendersController.remove);

module.exports = router;
