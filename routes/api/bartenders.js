const router = require("express").Router();
const booksController = require("../../controllers/bartendersController");

// Matches with "/api/bartenders"
router.route("/")
  .get(bartendersController.findAll)
  .post(bartendersController.create);

// Matches with "/api/bartenders/:id"
router
  .route("/:id")
  .get(bartendersController.findById)
  .put(bartendersController.update)
  .delete(bartendersController.remove);

module.exports = router;
