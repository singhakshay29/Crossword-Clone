const asyncHandle = require("express-async-handler");
const User = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
//@route Post api/users/login
//@access Private
const currentUser = asyncHandle(async (req, res) => {
  res.json(req.user);
});
//@desc Wishlist Add Item
//@route Post api/users/wishlist
//@access Private

const wishlist_Add = asyncHandle(async (req, res) =>{
  const { item }=req.body;
  if(!item){
    res.status(400);
    throw new Error("Item is Required");
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
    res.status(401).json({ error: "userId is not valid" });
  }
})

const getwishlist = asyncHandle(async(req ,res)=>{
  const _id = req.user.id; 
  const userAvailable = await User.findById(_id);
  if(userAvailable){
    res.status(200).json( userAvailable.wishlist )
  }else{
    res.status(401).json({ error: "User ID is not valid" });
  }
})

const wishlist_Del = asyncHandle(async(req,res)=>{
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

module.exports = { registerUser, loginUser, currentUser, wishlist_Add,getwishlist,wishlist_Del };
