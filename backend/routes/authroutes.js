const express = require("express");
const router = express.Router();
const validateToken = require('../middleware/validateToken')
const { registerUser, loginUser, currentUser } =require('../controller/Auth');

router.post('/signin',loginUser);
router.post('/signup',registerUser);
router.get("/current", validateToken, currentUser);

module.exports=router;