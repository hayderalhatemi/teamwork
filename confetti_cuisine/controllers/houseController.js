"use strict";

import expressEjsLayouts from "express-ejs-layouts";
import House from "../models/house.js";
import Price from "../models/prices.js"; // ✅ ADD THIS

// using async/await syntax
export default {
  // =========================
  // HOUSES
  // =========================
  getAllHouses: async (req, res) => {
    try {
      const Houses = await House.find({})
        .populate("owner", "username email")
        .exec();

      res.render("allhouse", { Houses });
      console.log("promise complete");
    } catch (error) {
      console.error(error.message);
      res.render("allhouse", { Houses: [] });
    }
  },

  registerHouse: (req, res) => {
    res.render("add_room");
  },

  saveHouse: async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.redirect("/auth/login");
      }
      const imagePaths = req.files
        ? req.files.map(file => `/uploads/${file.filename}`)
        : [];

      const newHouse = new House({
        kind: req.body.kind,
        number_of_rooms: req.body.number_of_rooms,
        zipCode: req.body.zipCode,
        streetAddress: req.body.streetAddress,
        rent_status: req.body.rent_status === "true",
        images: imagePaths,
        owner: req.session.userId
      });

      await newHouse.save();
      res.render("thanks");
      console.log("req.user:", req.user);

    } catch (error) {
      console.error(error);
      res.send(error);
    }
  },

  delete: (req, res, next) => {
    const houseId = req.params.id;

    House.findByIdAndRemove(houseId)
      .then(() => {
        res.locals.redirect = "/allrooms";
        next();
      })
      .catch(error => {
        console.log(`Error deleting rooms by ID: ${error.message}`);
        next();
      });
  },

  edit: async (req, res) => {
    try {
      const houseId = req.params.id;
      const houseToEdit = await House.findById(houseId).exec();

      if (houseToEdit) {
        res.render("edit_room", { house: houseToEdit });
      } else {
        res.redirect("/allrooms");
      }
    } catch (error) {
      console.error(error.message);
      res.redirect("/allrooms");
    }
  },

  update: async (req, res, next) => {
    try {
      const houseId = req.params.id;

      const imagePaths = req.files
        ? req.files.map(file => `/uploads/${file.filename}`)
        : [];

      const updatedData = {
        kind: req.body.kind,
        number_of_rooms: req.body.number_of_rooms,
        zipCode: req.body.zipCode,
        streetAddress: req.body.streetAddress,
        rent_status: req.body.rent_status === "true"
      };

      if (imagePaths.length > 0) {
        updatedData.images = imagePaths;
      }

      const updatedHouse = await House.findByIdAndUpdate(
        houseId,
        updatedData,
        { new: true }
      ).exec();

      if (updatedHouse) {
        res.locals.redirect = "/allrooms";
        next();
      } else {
        res.redirect("/allrooms");
      }
    } catch (error) {
      console.error(error.message);
      res.redirect("/allrooms");
    }
  },

  // =========================
  // PRICES (✅ NEW)
  // =========================
  // PRICES page = list of houses with owners
getPrices: async (req, res) => {
  try {
    const houses = await House.find({})
      .populate("owner", "username email")
      .exec();

    res.render("prices", { houses });
  } catch (error) {
    console.error(error);
    res.send("Error loading apartments");
  }
},


  redirectView: (req, res, next) => {
    const redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  }
};
