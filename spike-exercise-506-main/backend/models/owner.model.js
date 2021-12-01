const mongoose = require("mongoose");

const Owner = mongoose.model(
  "Owner",
  new mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectID,
      ref: "User"
    },
    properties: Array
  })
);

module.exports = Owner;
