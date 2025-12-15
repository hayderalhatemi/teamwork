"use strict";

import House from "../models/house.js";

export default {
  // STEP 1: Load apartments from DB instead of static prices
  showPrices: async (req, res) => {
    try {
      const houses = await House.find({})
        .populate("owner", "username email")
        .exec();

      res.render("prices", {
        houses
      });
    } catch (error) {
      console.error(error);
      res.send("Error loading apartments");
    }
  },

  showSignUp: (req, res) => {
    res.render("add_room");
  },

  postedSignUpForm: (req, res) => {
    res.render("thanks");
  }
};
