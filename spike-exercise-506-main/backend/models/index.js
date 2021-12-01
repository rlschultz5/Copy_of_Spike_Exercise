const mongoose = require('mongoose');

const db = {};

db.mongoose = mongoose;
db.user = require("./user.model");
db.role = require("./role.model");
db.payment = require("./payment.model");
db.maintenance = require("./maintenance.model")
db.application = require("./application.model");
db.property = require("./property.model");
db.renter = require("./renter.model");
db.owner = require("./owner.model");
db.payment = require("./payment.model")

db.ROLES = ["applicant", "renter", "owner"];

module.exports = db;
