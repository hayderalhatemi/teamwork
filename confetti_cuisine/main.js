"use strict";

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import layouts from "express-ejs-layouts";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";

import homeController from "./controllers/homeController.js";
import errorController from "./controllers/errorController.js";
import subscribersController from "./controllers/subscribersController.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

const PORT = process.env.PORT || 4000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/confetti_cuisine";

// ----- MongoDB connection -----
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB successfully"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));

// ----- View engine -----
app.set("view engine", "ejs");

// ----- Basic middleware -----
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(layouts);
app.use(express.static("public"));

// ----- Sessions -----
app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev-secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: MONGODB_URI,
      collectionName: "sessions",
      ttl: 14 * 24 * 60 * 60, // 14 days
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Make current user available in all views
app.use((req, res, next) => {
  res.locals.currentUser = req.session.userId
    ? {
        id: req.session.userId,
        role: req.session.userRole,
        name: req.session.userName,
      }
    : null;
  next();
});

// ----- Routes -----
app.get("/", (req, res) => {
  res.render("index");
});

app.use("/auth", authRoutes); // /auth/register, /auth/login, /auth/logout

app.get("/subscribers", subscribersController.getAllSubscribers);
app.get("/contact", subscribersController.getSubscriptionPage);
app.post("/subscribe", subscribersController.saveSubscriber);

app.get("/courses", homeController.showCourses);
app.post("/contact", homeController.postedSignUpForm);

// ----- Error handlers -----
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

// ----- Start server -----
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
