const mongoose = require("mongoose");

const Renter = mongoose.model(
  "Renter",
  new mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectID,
      ref: "User"
    },
    properties: Array
  })
);

module.exports = Renter;
