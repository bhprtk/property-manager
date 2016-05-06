'use strict';

var mongoose = require('mongoose');

var tenantSchema = new mongoose.Schema({
  name: { type: String, required: true},
  email: { type: String, required: true, match: [/\w+(\.)?\w+@\w+\.\w+(\.\w+)?/, "Please enter a valid email address!"] },
  phone: { type: Number, required: true, match: [/\d{10}/, "Please enter a valid phone number!"] },
  property: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }]
});

tenantSchema.statics.addProperty = function(tenantId, propertyId, cb) {
  Tenant.findById(tenantId, (err, tenant) => {
    if(err) return cb(err);

    if(tenant.property.length) {
      return cb({error: "Tenant already has a property!"})
    }

    tenant.property.push(propertyId);

    tenant.save((err, savedTenant) => {
      if(err) return cb(err);
      cb(savedTenant);
    });
  }).populate('property');
};




var Tenant = mongoose.model('Tenant', tenantSchema);

module.exports = Tenant;


//  tenant 57298aaa72e6dfef3026826c

// property 572973ae6d6183de2709526a
