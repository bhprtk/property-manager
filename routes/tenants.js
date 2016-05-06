var express = require('express');
var router = express.Router();

var Tenant = require('../models/tenant');
var Property = require('../models/property');

// /tenant/

router.post('/', (req, res) => {
    var newTenant = new Tenant(req.body);
    var tenantProperty = req.body.property;
    if(tenantProperty) {
      Property.findByIdAndUpdate(tenantProperty._id, { $set: {status: 'Occupied'}}, {new: true}, (err, property) => {
        if(err) return (err);
        return (property);
      });
    };
    newTenant.save((err, savedTenant) => {
        res.status(err ? 400 : 200).send(err || savedTenant);
    });
});

router.get('/', (req, res) => {
    Tenant
        .find({}, (err, tenants) => {
            res.status(err ? 400 : 200).send(err || tenants);
        }).populate('property');
});

router.put('/:id', (req, res) => {
    Tenant.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {
        new: true
    }, (err, tenant) => {
        res.status(err ? 400 : 200).send(err || tenant);
    }).populate('property');
});

router.delete('/:id', (req, res) => {
  var tenantId = req.params.id;

  Tenant.findById(tenantId, (err, tenant) => {
    console.log('tenant:',tenant);
  }).populate('tenant');

  Property.findByIdAndUpdate(req.params.id, { $set: {status: 'Vacant'}}, {new: true}, (err, property) => {
    if(err) return (err);
    return (property);
  });

    Tenant.findByIdAndRemove(req.params.id, err => {
        if (err) return res.status(400).send(err);
        res.send();
    });
});

router.put('/:tenantId/addProperty/:propertyId', (req, res) => {
  var tenantId = req.params.tenantId;
  var propertyId = req.params.propertyId;
    Tenant.addProperty(tenantId, propertyId, err => {
        if (err) return res.status(400).send(err);
    });
    Property.findByIdAndUpdate(tenantId, { $set: {status: 'Occupied'}}, {new: true}, (err, property) => {
      if(err) return (err);
      return (property);
    });

});


module.exports = router;
