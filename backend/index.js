const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbconnection");
const bookRoutes = require("./routes/routes");
const userRoutes = require("./routes/authroutes");

connectDB();
const app = express();
const port = process.env.PORT || 8080;

// middleware
app.use(express.json());
app.use(cors());

app.use("/user", userRoutes);
app.use("/", bookRoutes);

app.listen(port);

module.exports = app;
