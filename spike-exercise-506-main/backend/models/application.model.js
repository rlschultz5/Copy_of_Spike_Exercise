const mongoose = require("mongoose");

const Application = mongoose.model(
  "Application",
  new mongoose.Schema({
    name: String,
    address: String,
    phone: String,
    ssn: String,
    username: String,
    room_number: String,
    renter: {
      type: mongoose.Schema.Types.ObjectID,
      ref: "owner"
    },
    owner: {
      type: mongoose.Schema.Types.ObjectID,
      ref: "owner"
    },
    payment_information: {
      card_num: String,
      exp_date: String,
      cvv: String,
    },
    property: String,
    status: {
        accepted: Boolean,
        underReview: Boolean
    },
    archived_reason:String
  })
);

module.exports = Application;
