"use strict";
import httpStatus from 'http-status-codes';
//const httpStatus = require("http-status-codes");

//exports.pageNotFoundError = (req, res) => {
  //let errorCode = httpStatus.NOT_FOUND;
  //res.status(errorCode);
  //res.render("error");
//};

//exports.internalServerError = (error, req, res, next) => {
  //let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
  //console.log(`ERROR occurred: ${error.stack}`);
  //res.status(errorCode);
  //res.send(`${errorCode} | Sorry, our application is taking a nap!`);
//};
export default {
  pageNotFoundError: (req, res) => {
    let errorCode = httpStatus.NOT_FOUND;
    res.status(errorCode);
    res.render("error");
  },
  internalServerError: (error, req, res, next) => {
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    console.log(`ERROR occurred: ${error.stack}`);
    res.status(errorCode);
    res.send(`${errorCode} | Sorry, our application is taking a nap!`);
  }
};