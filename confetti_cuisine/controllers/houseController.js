"use strict";
import expressEjsLayouts from 'express-ejs-layouts';
import House from '../models/house.js';

// using the async/await syntact
export default {
  getAllHouses: async (req, res) => {
    const Houses = await House.find({}).exec()
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
      const newHouse = await new House({//add await
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
  },
  delete: (req, res, next) => {
    console.log("DELETE ID:", req.params.id);
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
  edit: async (req, res, next) => {
    try {
      const houseId = req.params.id;
      const houseToEdit = await House.findById(houseId).exec();
      if (houseToEdit) {
        res.render("edit_room", { house: houseToEdit });
      } else {
        res.redirect("/allrooms");
      }
    } catch (error) {
      console.error(`Error fetching house for edit: ${error.message}`);
      res.redirect("/allrooms")};
  },
  //update house
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
        rent_status: req.body.rent_status === 'true',
      };
      if (imagePaths.length > 0) {
        updatedData.images = imagePaths;
      }
      const updatedHouse = await House.findByIdAndUpdate(houseId, updatedData, { new: true }).exec();
      if (updatedHouse) {
        res.locals.redirect = "/allrooms";
        next();
      } else {
        res.redirect("/allrooms");
      }
    } catch (error) {
      console.error(`Error updating house: ${error.message}`);
      res.redirect("/allrooms");
    }
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  }
};  
