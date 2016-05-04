var express = require('express');
var router = express.Router();

var Property = require('../models/property');

// /property/

router.post('/', (req, res) => {
  var newProperty = new Property(req.body);
  newProperty.save((err, savedProperty) => {
    res.status(err ? 400 : 200).send(err || savedProperty);
  });
});

router.get('/', (req, res) => {
  Property.find({}, (err, properties) => {
    res.status(err ? 400 : 200).send(err || properties);
  });
});

router.get('/rent-min-max', (req, res) => {
  Property
    .find({rent: {$gte: req.query.min, $lte: req.query.max}})
    .exec((err, properties) => {
      res.status(err ? 400 : 200).send(err || properties);
    });
});

router.get('/util-min-max', (req, res) => {
  Property
    .find({rent: {$gte: req.query.min, $lte: req.query.max}})
    .exec((err, properties) => {
      res.status(err ? 400 : 200).send(err || properties);
    });
});

router.put('/:id', (req, res) => {
  Property.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true}, (err, property) => {
    res.status(err ? 400 : 200).send(err || property);
  });
});

router.delete('/:id', (req, res) => {
  Property.findByIdAndRemove(req.params.id, err => {
    if(err) return res.status(400).send(err);
    res.send();
  });
});




module.exports = router;
