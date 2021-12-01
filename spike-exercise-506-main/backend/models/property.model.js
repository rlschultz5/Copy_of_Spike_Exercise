const mongoose = require("mongoose");

const Property = mongoose.model("Property",
              new mongoose.Schema({
                address: {type: String, unique : true, required : true, dropDups: true},
                owner_id: {
                  type: mongoose.Schema.Types.ObjectID,
                  ref: "User"
                }
              })
            );

module.exports = Property;
