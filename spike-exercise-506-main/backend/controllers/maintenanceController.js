const App = require("../app.js");
const db = require("../models");
const Maintenance = db.maintenance;
const User = db.user;

exports.submitRequest = async (req, res) => {
  try {
    let request = await new Maintenance({
      owner: req.body.owner_id,
      description: req.body.description,
      isPriority: req.body.isPriority,
      status : {
        inProgress: true,
        isComplete: false
      }
    })
    await request.save();
    console.log(request);
    res.send({message: "Request has been successfully submitted."})
  } catch (err) {
    console.log(err);
    res.status(500).send({message: "Error occurred. Please check logs"});
  }

};

exports.getRequest = async (req, res) => {
  let request_id = req.body.request_id;

  try {
    let request = await Maintenance.findOne({_id: request_id})
    if (!request) {
      res.status(500).send({message: "No requests found"});
    }
    console.log(request)
    res.send({data: request});
  } catch (err) {
    console.log(err)
    res.status(500).send({message: err})
  }
}

exports.getOwnerRequests = async (req, res) => {
  if (!req.body.owner_id) {
    res.status(404).send({message: "Owner ID not provided."})
    return;
  }
  try {
    let requests = await Maintenance.find({owner_id: req.body.owner_id})
    console.log(requests);
    console.log(requests)
    res.send({data: requests});
  } catch (err) {
    console.log(err)
    res.status(500).send({message: err})
  }
}

exports.approveRequest = async (req, res) => {
  if (!req.body.request_id){
    throw "No request ID was sent."
  }

  try {
    let request_id = req.body.request_id;
    let options = {new: true};
    let result = await Maintenance.findOneAndUpdate({_id: request_id}, {status: {isComplete: true, inProgress: false}}, options);
    console.log(result);
    res.send({message: "Request has been approved."})

  } catch (err) {
    console.log(err);
    res.status(500).send({message: "An error has occured. Please check logs"})
  }
};
