const App = require("../app.js");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Payment = db.payment;
const Property = db.property;
const Renter = db.renter;
const Owner = db.owner

exports.signup = async (req, res) => {
  if (!req.body.role) {
    res.status(500).send({ message: "Role was not received." })
    return;
  }
  try {
    let role = await Role.findOne({ name: req.body.role });
    /* the expiry date sent from the
       front-end should be a String formatted "YYYY-MM-DD" */

    // let expiry_date_param = req.body.payment_info.expiry_date.split("-");
    // console.log(expiry_date_param)
    // if (expiry_date_param.length != 3){
    //   throw "Expiry date incorrectly formatted";
    // }
    // let year = parseInt(expiry_date_param[0]);
    // let month = parseInt(expiry_date_param[1]) - 1;
    // let day = parseInt(expiry_date_param[2]);
    // let expiry_date = new Date(year, month, day);
    let userObj = {}
    if (role.name != "owner") {
      userObj = {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        payment_info: {
          card_number: req.body.card_number,
          expiry_date: req.body.expiry_date,
          cvv: req.body.cvv
        },
        role: role.name
      }
    } else {
      userObj = {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        payment_info: {
          card_number: req.body.card_number,
          expiry_date: req.body.expiry_date,
          cvv: req.body.cvv
        },
        propertyList: req.body.propertyList,
        imageList: req.body.imageList,
        description: req.body.description,
        role: role.name,
      }
    }
    let user = await new User(userObj)
    await user.save()
    let user_document = await User.findOne({ username: req.body.username });
    let user_id = user_document._id;
    console.log("User ID: " + user_id)

    if (req.body.propertyList) {
      console.log("hello")
      let propertyList = req.body.propertyList;
      let properties = [];
      propertyList.forEach(async (propertyName, i) => {
        let property = new Property({ address: propertyName, owner_id: user_id });
        await property.save();
        properties.push(propertyName)
      });

      let secondaryUserObj = {
        user_id: user_id,
        properties: properties
      }
      if (role.name.toLowerCase() === "renter") {
        let renter = await new Renter(secondaryUserObj);
        await renter.save();
      }
      else if (role.name.toLowerCase() === "owner") {
        let owner = await new Owner(secondaryUserObj);
        await owner.save()
      }
    }

    // if (req.body.role.toLowerCase() === "renter" || req.body.role.toLowerCase() === "owner") {
    //   let roleName = req.body.role.toLowerCase();
    //   let propertyList = req.body.properties;
    //   let properties = [];
    //   propertyList.forEach(async (propertyName, i) => {
    //     let property = new Property({address: propertyName});
    //     await property.save();
    //     properties.push(propertyName)
    //   });
    //   userObj.properties = properties;
    // }

    let paymentRecord = new Payment({
      user_id: user._id,
      currentBalanceDue: 0
    })
    await paymentRecord.save()

    res.status(200).send({
      id: user._id,
      username: user.username,
      name: user.name,
      address: user.address,
      phone: user.phone,
      payment_info: user.payment_info,
      role: user.role
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: err });
  }
}

exports.signin = (req, res) => {
  console.log("request received");
  User.findOne({
    username: req.body.username
  })
    //.populate()         not sure if we need this line
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        res.status(404).send({ message: "User not found" });
        return;
      }

      //is this correct if we aren't using a token?
      if (req.body.password == user.password) {
        var isPasswordValid = true
      } else {
        var isPasswordValid = false
      }

      if (!isPasswordValid) {
        res.status(401).send({
          message: "Invalid Password"
        });
      } else {
        res.status(200).send({
          id: user._id,
          username: user.username,
          name: user.name,
          address: user.address,
          phone: user.phone,
          payment_info: user.payment_info,
          role: user.role
        })
      }

      //for (let i = 0; i < user.roles.length; i++) {
      //authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      //}
    });

};
