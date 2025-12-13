"use strict";
import expressEjsLayouts from 'express-ejs-layouts';
import house from '../models/house.js';

// using the async/await syntact
export default {
  getAllHouses: async (req, res) => {
    const Houses = await house.find({}).exec()
      .catch(error => {
        console.error(error.message);
        return []; // return empty array if error
      });

    res.render("allhouse", { Houses });
    console.log("promise complete");
  },


  registerHouse: (req, res) => {
    res.render("add_room");
  },
  saveHouse: async (req, res) => {//add async
    try {
    // Extract uploaded image paths
      const imagePaths = req.files
        ? req.files.map(file => `/uploads/${file.filename}`)
        : [];  
      const newHouse = await new house({//add await
        kind: req.body.kind,
        number_of_rooms: req.body.number_of_rooms,
        zipCode: req.body.zipCode,
        streetAddress: req.body.streetAddress,
        rent_status: req.body.rent_status === 'true',
        images: imagePaths
      });
    
      await newHouse.save();
      res.render("thanks");
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  }
};
