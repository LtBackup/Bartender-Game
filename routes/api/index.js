const router = require("express").Router();
const bartenderRoutes = require("./bartenders");

// Bartender routes
router.use("/bartenders", bartenderRoutes);

module.exports = router;
