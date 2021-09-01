const express = require("express");

const router = express.Router();

//middlewares
const { authCheck, adminCheck } = require("../middlewares/auth"); 

//controller
const { createOrUpdateUser, currentUser, login, register } = require("../controllers/auth");


router.post("/create-or-update-user", createOrUpdateUser); 
router.post("/login", login); 
router.post("/register", register); 
router.post("/current-user", authCheck, currentUser); 
router.post("/current-admin", authCheck, adminCheck, currentUser); 


module.exports = router;