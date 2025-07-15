const express = require("express");
const router = express.Router();

const {
  createShortUrl,
  retrieveUrl,
  updateUrl,
  deleteUrl,
  getUrlStats,
} = require("../controllers/url-controllers");

//define routes for url
router.post("/shorten", createShortUrl);
router.get("/shorten/:shortCode", retrieveUrl);
router.put("/shorten/:shortCode", updateUrl);
router.delete("/shorten/:shortCode", deleteUrl);
router.get("/shorten/:shortCode/stats", getUrlStats);

module.exports = router;
