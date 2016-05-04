'use strict';

var mongoose = require('mongoose');

var tenantSchema = new mongoose.Schema({
  name: { type: String, required: true},
  email: { type: String, required: true, match: [/\w+(\.)?\w+@\w+\.\w+(\.\w+)?/, "Please enter a valid email address!"] },
  phone: { type: String, required: true, match: [/\d{10}/, "Please enter a valid phone number!"] }
});


var Tenant = mongoose.model('Tenant', tenantSchema);



module.exports = Tenant;
