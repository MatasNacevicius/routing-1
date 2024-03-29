const express = require("express");
const router = express.Router();

const { setAd, getAds } = require("../controllers/adController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, setAd).get(protect, getAds);

module.exports = router;
