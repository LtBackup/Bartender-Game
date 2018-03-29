const router = require("express").Router();
const bartendersController = require("../../controllers/bartendersController");

// Matches with "/api/bartenders"
router.route("/")
  .post(bartendersController.create);

// Matches with "/api/bartenders/:id"
router
  .route("/:username")
  .get(bartendersController.findByUsername)
  .put(bartendersController.update)
  .delete(bartendersController.remove);

module.exports = router;
