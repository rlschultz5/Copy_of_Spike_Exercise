const App = require("../app.js");
const db = require("../models");
const Payment = db.payment;

exports.getBalance = (req, res) => {
  // the request contains the user_id that we are going to be using to get the balance
  let id = req.body.user_id;
  Payment.findOne({user_id: id}, (err, balanceObj) => {
    if (err) {
      res.status(500).send({message: err});
      return;
    }
    if (!balanceObj) {
      res.status(500).send({message: "No balance was found!"});
    }
    console.log(balanceObj)
    res.send({balanceObj});
  })
}

// owner charges payment to renter by renter id
exports.chargePayment = (req, res) => {
  let renter_id = req.body.renter_id;
  let chargeAmount = req.body.chargeAmount;
  let options = {new: true}
  Payment.findOneAndUpdate({user_id: renter_id}, {$inc: {currentBalanceDue: chargeAmount}, note: req.body.note}, options, (err, payment) => {
    if (err) {
      res.status(500).send({message: err});
      return;
    }

    console.log(payment);
    res.send({
      message: "Renter was successfully charged",
      renter_id: payment.user_id,
      newBalance: payment.currentBalanceDue
    });
  })
}

// renter submits payment to owner/system by id
exports.submitPayment = (req, res) => {
  let user_id = req.body.user_id;
  let paymentAmount = req.body.paymentAmount;
  let options = {new: true}
  Payment.findOneAndUpdate({user_id: user_id}, {$inc: {currentBalanceDue: paymentAmount * -1}}, options, (err, payment) => {
    if (err) {
      res.status(500).send({message: err});

      return;
    }
    console.log(payment);
    res.send({
      message: "Payment successfully processed",
      renter_id: payment.user_id,
      newBalance: payment.currentBalanceDue
    })
  });
}
