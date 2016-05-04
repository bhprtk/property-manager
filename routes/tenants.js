var express = require('express');
var router = express.Router();

var Tenant = require('../models/tenant');

// /tenant/

router.post('/', (req, res) => {
  var newTenant = new Tenant(req.body);
  newTenant.save((err, savedTenant) => {
    res.status(err ? 400 : 200).send(err || savedTenant);
  });
});

router.get('/', (req, res) => {
  Tenant.find({}, (err, tenants) => {
    res.status(err ? 400 : 200).send(err || tenants);
  });
});

router.put('/:id', (req, res) => {
  Tenant.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true}, (err, tenant) => {
    res.status(err ? 400 : 200).send(err || tenant);
  });
});

router.delete('/:id', (req, res) => {
  Tenant.findByIdAndRemove(req.params.id, err => {
    if(err) return res.status(400).send(err);
    res.send();
  });
});


module.exports = router;
