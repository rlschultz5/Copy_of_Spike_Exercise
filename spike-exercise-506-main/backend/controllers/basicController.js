const App = require("../app.js");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Property = db.property

// retrieves a user from the database based on username
exports.getUser = (req, res) => {
  if (!req.body.username){
    res.status(500).send({message: "No username submitted"});
  }
  User.findOne({username: req.body.username}, (err, user) => {
    if (err) {
      res.status(500).send({message: err});
      return;
    }
    res.status(200).send({
      data: {
        name: user.name,
        username: user.username,
        role: user.role
      }
    })
  })

}

// retrieves a role from the database based on role id
exports.getRole = (req, res) => {
  if (!req.body.id){
    res.status(500).send({message: "No role id submitted"});
  }
  Role.findOne({_id: req.body.id}, (err, role) => {
    if (err) {
      res.status(500).send({message: err});
      return;
    }
    res.status(200).send({name: role.name})
  })
}

exports.getUserByRole = async (req, res) => {
  if (!req.body.role) {
    res.status(500).send({message: "No role was provided."})
  }
  try {
    let result = await User.find({role: req.body.role})
    console.log(result)
    res.send({data: result})
  } catch (err) {
    console.log(err)
    res.status(500).send({message: err})
  }

  // User.find({role: owner}, (err, allOwners) => {
  //   if (err) {
  //     res.status(500).send({message: err});
  //     return;
  //   }
  //   res.status(200).send(allOwners)
  // })
}

// adds property to the databse
// needs to be fixed
exports.addProperty = async (req, res) => {
  if (!req.body.address){
    res.status(404).send({message:"No address was sent"})
  }

  try {
    let property = await new Property({address: req.body.address});
    await property.save();
    console.log(property);
    res.send({message: "Property added to database"})
  } catch (err) {
    res.status(500).send({message: err});
  }
}

// gets properties by owner id
exports.getProperties = async (req, res) => {
  if (!req.body.owner_id){
    res.status(404).send({message: "No owner id sent."})
  }

  try {
    let properties = await Property.find({owner_id: req.body.owner_id})
    console.log(properties);
    res.send({
      data: properties
    })
  } catch (err) {
    res.status(500).send({message : err})
  }
}

// exports.getRenters = (req, res) => {
//   // User.find({role: renter}, (err, allRenters) => {
//   //   if (err) {
//   //     res.status(500).send({message: err});
//   //     return;
//   //   }
//   //   res.status(200).send(allRenters)
//   // })
// }
