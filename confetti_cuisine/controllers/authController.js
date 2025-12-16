// controllers/authController.js
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import User from "../models/user.js";

const SALT_ROUNDS = 10;

// GET /auth/register
export const showRegister = (req, res) => {
  res.render("register", { errors: [], form: {} });
};

// POST /auth/register
export const register = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("register", {
      errors: errors.array(),
      form: req.body,
    });
  }

  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).render("register", {
        errors: [{ msg: "Email is already registered" }],
        form: req.body,
      });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({
      name,
      email,
      passwordHash,
    });

    // create session (we'll wire session middleware soon)
    req.session.userId = user._id;
    req.session.userRole = user.role;
    req.session.userName = user.name;

    return res.redirect("/");
  } catch (err) {
    console.error(err);
    return res.status(500).render("register", {
      errors: [{ msg: "Server error while registering" }],
      form: req.body,
    });
  }
};

// GET /auth/login
export const showLogin = (req, res) => {
  res.render("login", { errors: [], form: {} });
};

// POST /auth/login
export const login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("login", {
      errors: errors.array(),
      form: req.body,
    });
  }

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).render("login", {
        errors: [{ msg: "Invalid email or password" }],
        form: req.body,
      });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(400).render("login", {
        errors: [{ msg: "Invalid email or password" }],
        form: req.body,
      });
    }

    req.session.userId = user._id;
    req.session.userRole = user.role;
    req.session.userName = user.name;

    return res.redirect("/");
  } catch (err) {
    console.error(err);
    return res.status(500).render("login", {
      errors: [{ msg: "Server error while logging in" }],
      form: req.body,
    });
  }
};

// POST /auth/logout
export const logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
};
//check login status
export const isLoggedIn = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect("/auth/login");
  }
  next();
};