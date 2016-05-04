'use strict';

var mongoose = require('mongoose');

var propertySchema = new mongoose.Schema({
  apartment: { type: String, required: true },
  status: { type: String, required: true, enum: ['Vacant', 'Occupied'] },
  rent: { type: Number, required: true },
  utilities: { type: Number, required: true }
});


var Property = mongoose.model('Property', propertySchema);



module.exports = Property;
