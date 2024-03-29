const asyncHandler = require("express-async-handler");

const Ad = require("../models/adModel");

// @route POST /api/ads
// @access PRIVATE

const setAd = asyncHandler(async (req, res) => {
  if (!req.body.text || !req.body.description || !req.body.price) {
    res.status(400);
    throw new Error("Please add required fields");
  }

  const ad = await Ad.create({
    text: req.body.text,
    description: req.body.description,
    price: req.body.price,
    user: req.user.id,
  });
  res.status(200).json(ad);
});

// @route GET /api/ads
// @access PRIVATE

const getAds = asyncHandler(async (req, res) => {
  const ads = await Ad.find({ user: req.user.id });
  res.status(200).json(ads);
});

module.exports = { setAd, getAds };
