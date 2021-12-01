const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {type: String, unique : true, required : true, dropDups: true },
    password: {type: String, required : true},
    name: String,
    address: String,
    phone: String,
    payment_info: {
      card_number: String,
      expiry_date: String,
      cvv: String
    },
    role: {
        type: mongoose.Schema.Types.String,
        ref: "Role"
    },
    propertyList: [],
    imageList:[],
    description: String
  })
);

module.exports = User;
