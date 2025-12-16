"use strict";

import mongoose from "mongoose";

const houseSchema = new mongoose.Schema({
  kind: {
    type: String,
    required: [true, "kind is required"],
    trim: true
  },

  number_of_rooms: {
    type: Number,
    required: [true, "Number is required"]
  },

  zipCode: {
    type: Number,
    required: [true, "zipcode is required"],
    min: [1000, "Zip code too short"],
    max: 99999
  },

  streetAddress: {
    type: String,
    required: [true, "Address is required"],
    trim: true
  },

  rent_status: {
    type: Boolean,
    default: false
  },

  // array of image file paths
  images: [{ type: String }],

  // ✅ STEP 1: apartment owner (user who created it)
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

houseSchema.methods.getInfo = function () {
  return `Kind: ${this.kind}
Number of Rooms: ${this.number_of_rooms}
Zip Code: ${this.zipCode}
Street Address: ${this.streetAddress}
Rent Status: ${this.rent_status}
Images: ${this.images}`;
};

export default mongoose.model("house", houseSchema);
