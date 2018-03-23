const router = require("express").Router();
const bartenderRoutes = require("./bartenders");

// Book routes
router.use("/bartenders", bartenderRoutes);

module.exports = router;
