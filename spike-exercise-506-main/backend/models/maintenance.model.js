const mongoose = require("mongoose");

const Maintenance = mongoose.model("Maintenance",
                new mongoose.Schema({
                    owner_id: {
                      type: mongoose.Schema.Types.ObjectID,
                      ref: "Owner"
                    },
                    description: String,
                    isPriority: Boolean,
                    status: {
                      inProgress: Boolean,
                      isComplete: Boolean
                    }
                })
              );

module.exports = Maintenance;
