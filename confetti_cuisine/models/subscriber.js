"use strict";

/* const mongoose = require("mongoose"),
  subscriberSchema = mongoose.Schema({
    name: String,
    email: String,
    zipCode: Number
  });

module.exports = mongoose.model("Subscriber", subscriberSchema); */

import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema({
  name: {type: String, required: [true, "Name is required"], trim: true},
  email: {type: String, required: [true, "Email is required"], trim: true, lowercase: true},
  zipCode: {type: Number, required: [true, "zipcode is required"], min: [1000, "Zip code too short"], max: 99999},
  streetAddress: {type: String, required: [true, "Address is required"], trim: true},
  vip: {type: Boolean, default: false},
  couses: [
    {type: mongoose.Schema.Types.ObjectId, ref: "Course"}],
});
subscriberSchema.methods.getInfo = function() {
  return `Name: ${this.name}
  Email: ${this.email}
  Zip Code: ${this.zipCode},
  Street Address: ${this.streetAddress}`;
};
export default mongoose.model("Subscriber", subscriberSchema);