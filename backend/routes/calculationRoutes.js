const express = require("express");
const router = express.Router();
const calculationController = require("../controllers/calculationController");

router.post("/calculate", calculationController.calculate);
router.get("/history", calculationController.getHistory);

module.exports = router;
