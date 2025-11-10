"use strict";

/* const express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  subscribersController = require("./controllers/subscribersController"),
  layouts = require("express-ejs-layouts");
 */
import dotenv from 'dotenv';
//import helmet from 'helmet';
dotenv.config();
import express from 'express';
const app = express();
//use the helmet middleware
//app.use(helmet());
import homeController from './controllers/homeController.js';
import errorController from './controllers/errorController.js';
import subscribersController from './controllers/subscribersController.js';
import layouts from 'express-ejs-layouts';
//const mongoose = require("mongoose");
import mongoose from 'mongoose';

/* mongoose.connect(
  "mongodb://localhost:27017/confetti_cuisine",
  { useNewUrlParser: true }
); */
//Connect MongoDB using MONGODB_URI
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ Connected to MongoDB successfully"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));
mongoose.set("useCreateIndex", true);
app.set("view engine", "ejs");
const PORT = process.env.PORT || 4000;
//app.set("port", process.env.PORT || 3000);
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(layouts);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/subscribers", subscribersController.getAllSubscribers);
app.get("/contact", subscribersController.getSubscriptionPage);
app.post("/subscribe", subscribersController.saveSubscriber);

app.get("/courses", homeController.showCourses);
app.post("/contact", homeController.postedSignUpForm);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

/* app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
}); */
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
