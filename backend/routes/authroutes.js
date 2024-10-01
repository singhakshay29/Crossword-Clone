const express = require("express");
const router = express.Router();
const validateToken = require('../middleware/validateToken')
const { registerUser, loginUser, currentUser, addToWishlist,getWishlist,removeWhislistItem, addToCart, getCart, removeCartItem, updateCartItem } =require('../controller/Auth');

router.post('/signin',loginUser);
router.post('/signup',registerUser);
router.get("/current", validateToken, currentUser);

router.get('/wishlist',validateToken,getWishlist);
router.post('/wishlist/add',validateToken, addToWishlist);
router.delete('/wishlist/remove/:productId',validateToken,removeWhislistItem);

router.get('/cart',validateToken,getCart);
router.post('/cart/add',validateToken, addToCart);
router.put('/cart/update',validateToken,updateCartItem);
router.delete('/cart/remove/:productId',validateToken,removeCartItem);


module.exports=router;