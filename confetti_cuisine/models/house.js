"use strict";

import mongoose from "mongoose";

const houseSchema = new mongoose.Schema({
  kind: {type: String, required: [true, "kind is required"], trim: true},
  number_of_rooms: {type: Number, required: [true, "Number is required"], trim: true},
  zipCode: {type: Number, required: [true, "zipcode is required"], min: [1000, "Zip code too short"], max: 99999},
  streetAddress: {type: String, required: [true, "Address is required"], trim: true},
  rent_status: {type: Boolean, default: false},
  //array of image file paths
  images: [{type: String}]
});
houseSchema.methods.getInfo = function() {
  return `kind: ${this.kind}
  Number of Room: ${this.number_of_rooms}
  Zip Code: ${this.zipCode},
  Street Address: ${this.streetAddress},
  Rent Status: ${this.rent_status},
  images: this.images`
};
export default mongoose.model("house", houseSchema);