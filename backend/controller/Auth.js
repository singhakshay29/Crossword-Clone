const asyncHandle = require("express-async-handler");
const User = require("../models/usermodel");
const Cart = require("../models/cartmodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {response} = require("express");
const dotenv = require("dotenv").config();

//@desc Register User
//@route Post api/users/register
//@access Public
const registerUser = asyncHandle(async (req, res) => {
  const { first, last, email, password } = req.body;
  if (!first || !last || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandetory");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400).json({ error: "User Already Exists" });
    return;
  }
  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword, "Hashed Password");
  const user = await User.create({
    first,
    last,
    email,
    password: hashedPassword
  });
  if (user) {
    const accessToken = jwt.sign(
      {
        user: {
          id: user._id,
          email: user.email
        }
      },
      process.env.ACCESS_TOKEN_SECRET
    );
    res
      .status(201)
      .json({ token: accessToken });
  } else {
    res.status(400).json({ error: "User data not valid" });
  }
});

//@desc Login User
//@route Post api/users/login
//@access Public
const loginUser = asyncHandle(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandetory");
  }
  const userAvailable = await User.findOne({ email });
  //compare
  if (
    userAvailable &&
    (await bcrypt.compare(password, userAvailable.password))
  ) {
    const accessToken = jwt.sign(
      {
        user: {
          id: userAvailable._id,
          email: userAvailable.email
        }
      },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.status(200).json({ token:accessToken });
  } else {
    res.status(401).json({ error: "email or password not valid" });
  }
});

//@desc Current User
//@route GET api/users/login
//@access Private
const currentUser = asyncHandle(async (req, res) => {
  res.json(req.user);
});

//@desc Add Item To Wishlist
//@route Post api/users/wishlist/add
//@access Private
const addToWishlist = asyncHandle(async (req, res) =>{
  const { item }=req.body;
  if(!item){
    res.status(400).json({message:"Item is Required"});
  }
  const _id = req.user.id; 
  const userAvailable = await User.findOne({ _id });
  if(userAvailable){
    const productIndex = userAvailable.wishlist.findIndex(item => item._id === product_Id);
    if (productIndex > -1) {
      res.status(200).json({ message: "Item added to wishlist" });
    }else{
      userAvailable.wishlist.push(item);
      await userAvailable.save();
      res.status(200).json({ message: "Item added to wishlist" });
    }
  }else{
    res.status(401).json({ error: "User is not valid" });
  }
})

//@desc Get Wishlist
//@route GET api/users/wishlist
//@access Private
const getWishlist = asyncHandle(async(req ,res)=>{
  const _id = req.user.id; 
  const userAvailable = await User.findById(_id);
  if(userAvailable){
    res.status(200).json( userAvailable.wishlist )
  }else{
    res.status(401).json({ error: "User ID is not valid" });
  }
})

//@desc Remove Item from wishlist
//@route Delete api/users/wishlist/remove/:productId
//@access Private
const removeWhislistItem = asyncHandle(async(req,res)=>{
  const product_Id = req.params.productId;
  const _id = req.user.id; 
  const userAvailable = await User.findById(_id);
  if(userAvailable){
    const productIndex = userAvailable.wishlist.findIndex(item => item._id === product_Id);
    if (productIndex > -1) {
      userAvailable.wishlist.splice(productIndex, 1);
      await userAvailable.save();
      res.status(200).json({ message: "Item removed from wishlist"});
  }else{
    res.status(404).json({ error: "Item not found in wishlist" });
  }
  }else{
    res.status(404).json({ error: "User not found" });
  }
})

//@desc Get Cart
//@route GET api/users/cart
//@access Private
const getCart = asyncHandle(async(req ,res)=>{
  const _id = req.user.id; 
  const userAvailable = await User.findById(_id).populate('cart');
  if(userAvailable){
    res.status(200).json( userAvailable.cart )
  }else{
    res.status(401).json({ error: "User ID is not valid" });
  }
})

//@desc Add Item To Cart
//@route Post api/users/cart/add
//@access Private
const addToCart = asyncHandle(async (req, res) => {
  const { _id, imgUrl, quantity, price } = req.body;
 
  const user = await User.findById(req.user.id);
  if (user) {
  let cart = await Cart.findById(user.cart);
  if (!cart) {
    cart = await Cart.create({ items: [], subTotal: 0 });
    user.cart = cart._id;
    await user.save();
  }
  const total = quantity * price;
  
  const itemIndex = cart.items.findIndex(item => item._id === _id);
  
  if (itemIndex !== -1) {
    // If the item already exists, update its quantity and total
    cart.items[itemIndex].quantity += quantity;
    cart.items[itemIndex].total += total;
  } else {
    // If the item does not exist, add a new item
    const newItem = {
      _id,
      imgUrl,
      quantity,
      price,
      total
    };
    cart.items.push(newItem);
  }
  
  cart.subTotal = cart.items.reduce((sum, item) => sum + item.total, 0);
  
  await cart.save();
  res.status(200).json({ message: "Item added in cart",response:cart });
  } else {
    res.status(401).json({ error: "userId is not valid" });
  }
});

//@desc Update Item of Cart
//@route Put api/users/cart/update
//@access Private
const updateCartItem = asyncHandle(async (req, res) => {
  const { productId, quantity } = req.body;
  const user = await User.findById(req.user.id).populate("cart");

  if (user){
    if(user.cart){
      const cart = await Cart.findById(user.cart._id);
      const itemIndex = cart.items.findIndex(item => 
        item._id.toString() === productId
      );
      if (itemIndex === -1) {
        res.status(404).json({message:"Item not found in cart"})
      }else{
        cart.items[itemIndex].quantity = quantity;
        cart.items[itemIndex].total = cart.items[itemIndex].price * quantity;
        cart.subTotal = cart.items.reduce((sum, item) => sum + item.total, 0);
        await cart.save();
        res.status(200).json({message:"Item Updated Sucessfully",data:cart});
      }
    }else{
      res.status(404).json({message:"Cart not found"})
    }
  } else {
    res.status(404).json({message:"User not found"})
  }
});

//@desc Delete Item from Cart
//@route Delete api/users/cart/remove:productId
//@access Private
const removeCartItem = asyncHandle(async (req, res) => {
  const { productId } = req.params;
  const user = await User.findById(req.user.id).populate("cart");
  if (user) {
    if(user.cart){
      const cart = await Cart.findById(user.cart._id);
      cart.items = cart.items.filter(item => {
        item.productId !== productId
      }
      );
      cart.subTotal = cart.items.reduce((sum, item) => sum + item.total, 0);
      await cart.save();
      res.status(200).json({ message: "Product Remove Successfully",data:cart });
    }else{
      res.status(404).json({ message: "Cart not found" });
    }
  } else {
    res.status(404).json({ message: "User not found" });
  }
});


module.exports = { registerUser, loginUser, currentUser,getWishlist,addToWishlist,removeWhislistItem,addToCart,removeCartItem,getCart,updateCartItem };
