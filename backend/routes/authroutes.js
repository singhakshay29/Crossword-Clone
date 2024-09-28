const express = require("express");
const router = express.Router();
const validateToken = require('../middleware/validateToken')
const { registerUser, loginUser, currentUser, wishlist_Add,getwishlist,wishlist_Del } =require('../controller/Auth');

router.post('/signin',loginUser);
router.post('/signup',registerUser);
router.get("/current", validateToken, currentUser);
router.post('/wishlist',validateToken, wishlist_Add);
router.get('/wishlist',validateToken,getwishlist);
router.delete('/wishlist/:productId',validateToken,wishlist_Del)


module.exports=router;