"use strict";

var courses = [
  {
    title: "Event Driven Cakes",
    cost: 50
  },
  {
    title: "Asynchronous Artichoke",
    cost: 25
  },
  {
    title: "Object Oriented Orange Juice",
    cost: 10
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
  showCourses: (req, res) => {
    res.render("courses", {
      offeredCourses: courses
    });
  },

  showSignUp:(req, res) => {
    res.render("contact");
  },

  postedSignUpForm:(req, res) => {
    res.render("thanks");
  }
};