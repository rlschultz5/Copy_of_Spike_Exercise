const mongoose = require("mongoose");
//const Double = require("@mongoosejs/double")

const Payment = mongoose.model("Payment",
                new mongoose.Schema({
                  user_id: {
                    type: mongoose.Schema.Types.ObjectID,
                    ref: "User"
                  },
                  currentBalanceDue: Number,
                  note: String
                })
              );

module.exports = Payment;
