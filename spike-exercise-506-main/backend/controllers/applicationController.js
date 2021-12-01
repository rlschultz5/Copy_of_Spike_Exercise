const App = require("../app.js");
const db = require("../models");
const User = db.user;
const Application = db.application
const Role = db.role;
const Property = db.property;

exports.apply = async (req, res) => {
  try {/*
    let expiry_date_param = req.body.payment_info.expiry_date.split("-");
    if (expiry_date_param.length != 3){
      throw "Expiry date incorrectly formatted";
    }
    let year = parseInt(expiry_date_param[0]);
    let month = parseInt(expiry_date_param[1]) - 1;
    let day = parseInt(expiry_date_param[2]);
    //let expiry_date = new Date(year, month, day)*/
    let applicationProperty = await Property.find({address: req.body.property_address});
    let application = await new Application({
      name: req.body.name,
      address: req.body.address,
      phone: req.body.number,
      ssn: req.body.ssn,
      owner: req.body.owner,
      room_number: req.body.room_number,
      email: req.body.email,
      renter: req.body.user_id,
      property: applicationProperty.address,
      status: {
        accepted: false,
        underReview: true
      }
    })
    /*payment_information: {
        card_num: req.body.card_num,
        exp_date: expiry_date,
        cvv: req.body.cvv
      },*/
    await application.save();
    console.log(application);
    res.send({
      message: "Application submitted successfully!",
    })
  } catch (err) {
    res.status(500).send({message: err});
  }
}


exports.getArchivedApplication = (req, res) => {
  let id = req.body.owner;
  console.log(req.body);
  Application.find({owner: id, "status.accepted":false, "status.underReview":false}, (err, applications) => {
    if (err) {
      res.status(500).send({message: err});
      return;
    }
    if (!applications) {
      res.status(500).send({message: "No applications were found!"});
    }

    console.log(applications)
    res.send(applications);
  })
}

  exports.getAcceptedApplications = (req, res) => {
    let id = req.body.owner;
    console.log(req.body);
    Application.find({owner: id, "status.accepted":true}, (err, applications) => {
      if (err) {
        res.status(500).send({message: err});
        return;
      }
      if (!applications) {
        res.status(500).send({message: "No applications were found!"});
      }

      console.log(applications)
      res.send(applications);
    })
  }
  // there are some issues with this method - chech the application model
  // Currently applications are returned based on Properties. However, need to return based on Maintenance.
  // This means that application model needs management (owner) field for convenience.
  exports.getApplications = (req, res) => {
    let id = req.body.owner;
    console.log(req.body);
    Application.find({owner: id, "status.accepted":false, "status.underReview":true}, (err, applications) => {
      if (err) {
        res.status(500).send({message: err});
        return;
      }
      if (!applications) {
        res.status(500).send({message: "No applications were found!"});
      }

      console.log(applications)
      res.send(applications);
    })
  }

  exports.acceptApplication = async (req, res) => {
    if (!req.body.application_id){
      throw "No application ID was sent."
    }

    try {
      let application_id = req.body.application_id;
      let options = {new: true};
      let result = await Application.findOneAndUpdate({_id: application_id}, {status: {accepted: true, underReview: false}}, options);
      let temp = await User.findOneAndUpdate({_id: result.user_id}, {address:result.property});
      console.log(result);
      res.send({message: "Application was accepted."})
    } catch (err) {
      console.log(err)
      res.status(500).send({message: err});
    }
  }

  exports.denyApplication = async (req, res) => {
    if (!req.body.application_id){
      throw "No application ID was sent."
    }

    try {
      let application_id = req.body.application_id;
      let options = {new: true};
      let result = await Application.findOneAndUpdate({_id: application_id}, {status: {accepted: false, underReview: false}, archived_reason:"Denied"}, options);
      console.log(result);
      res.send({message: "Application was denied."})
    } catch (err) {
      res.status(500).send({message: err});
    }
  }

  exports.removeApplication = async (req, res) => {
    if (!req.body.application_id){
      throw "No application ID was sent."
    }

    try {
      let application_id = req.body.application_id;
      let options = {new: true};
      let result = await Application.findOneAndUpdate({_id: application_id}, {status: {accepted: false, underReview: false}, archived_reason:"Removed"}, options);
      console.log(result);
      res.send({message: "Application was removed."})
    } catch (err) {
      res.status(500).send({message: err});
    }
  }
