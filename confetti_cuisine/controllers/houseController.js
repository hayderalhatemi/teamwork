"use strict";
import expressEjsLayouts from 'express-ejs-layouts';
import house from '../models/house.js';
 /* 
export default {
  getAllSubscribers: (req, res) => {
    Subscriber.find({})
      .exec()
      .then(subscribers => {
        res.render("subscribers", {
          subscribers: subscribers
        });
      })
      .catch(error => {
        console.log(error.message);
        return [];
      })
      .then(() => {
        console.log("promise complete");
      });
  },*/
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
    let newHouse = await new house({//add await
      kind: req.body.kind,
      number_of_rooms: req.body.number_of_rooms,
      zipCode: req.body.zipCode,
      streetAddress: req.body.streetAddress,
      rent_status: req.body.rent_status === 'true'
    });
    newHouse
      .save()
      .then(() => {
        res.render("thanks");
      })
      .catch(error => {
        res.send(error);
      });
  }
};
