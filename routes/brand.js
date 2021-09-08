const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const { create, list, read, update, remove, searchBrands } = require("../controllers/brand");

// routes
router.post("/brand", authCheck, adminCheck, create);
router.get("/brands", list);
router.get("/brand/:slug", read);
router.post("/search-brand/by-text", searchBrands);
router.put("/brand/:slug", authCheck, adminCheck, update);
router.delete("/brand/:slug", authCheck, adminCheck, remove);

module.exports = router;