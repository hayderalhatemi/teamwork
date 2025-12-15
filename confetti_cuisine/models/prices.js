"use strict";

import mongoose from "mongoose";

const priceSchema = new mongoose.Schema({
  kind: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  number_of_room: {
    type: Number,
    required: true,
    min: [1, "Number of rooms must be greater than zero"]
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price cannot be negative"]
  }
});

export default mongoose.model("Price", priceSchema);
