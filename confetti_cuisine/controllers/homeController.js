"use strict";

var prices = [
  {
    kind: "Villa",
    address: "Juokahaisenkatu 3 20540 Turku",
    number_of_room: 3,
    price: 100
  },
  {
    kind: "Appartment",
    address: "linnankatu 3 20540 Turku",
    number_of_room: 2,
    price: 50
  },
  {
    kind: "Room",
    address: "Yo-kylä 3 20540 Turku",
    number_of_room: 1,
    price: 30
  }
];

/* exports.showCourses = (req, res) => {
  res.render("courses", {
    offeredCourses: courses
  });
};

exports.showSignUp = (req, res) => {
  res.render("contact");
};

exports.postedSignUpForm = (req, res) => {
  res.render("thanks");
}; */

export default {
  showPrices: (req, res) => {
    res.render("prices", {
      offeredPrices: prices
    });
  },

  showSignUp:(req, res) => {
    res.render("add_room");
  },

  postedSignUpForm:(req, res) => {
    res.render("thanks");
  }
};