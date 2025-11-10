"use strict";
import expressEjsLayouts from 'express-ejs-layouts';
import Subscriber from '../models/subscriber.js';
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
  getAllSubscribers: async (req, res) => {
    const subscribers = await Subscriber.find({}).exec()
      .catch(error => {
        console.error(error.message);
        return []; // return empty array if error
      });

    res.render("subscribers", { subscribers });
    console.log("promise complete");
  },


  getSubscriptionPage: (req, res) => {
    res.render("contact");
  },
  saveSubscriber: async (req, res) => {//add async
    let newSubscriber = await new Subscriber({//add await
      name: req.body.name,
      email: req.body.email,
      zipCode: req.body.zipCode,
      streetAddress: req.body.streetAddress,
      vip: req.body.vip === 'true'
    });
    newSubscriber
      .save()
      .then(() => {
        res.render("thanks");
      })
      .catch(error => {
        res.send(error);
      });
  }
};
