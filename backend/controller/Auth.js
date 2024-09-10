const asyncHandle = require("express-async-handler");
const User = require('../models/usermodel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//@desc Register User
//@route Post api/users/register
//@access Public
const registerUser = asyncHandle(async (req, res) => {
  const { first,last, email, password } = req.body;
  console.log(first,last, email, password);
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
    password: hashedPassword,
  });
  console.log(user);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
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
          username: userAvailable.username,
          email: userAvailable.email,
          id: userAvailable.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
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

module.exports = { registerUser, loginUser, currentUser };
