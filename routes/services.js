// jshint esversion: 6

var express = require('express');
var router = express.Router();
var serviceModel = require('../shared/models/service');
var serviceCategoryModel = require('../shared/models/servicecategory');

/* GET users listing. */
router.get('/', function(req, res, next) {
  serviceModel.find((err, result) => {
    let data = JSON.stringify(result);
    res.send(data);
    res.status(200).end();
  });
});

router.get('/categories', function(req, res, next) {
  serviceCategoryModel.find((err, result) => {
    let data = JSON.stringify(result);
    res.send(data);
    res.status(200).end();
  });
});


module.exports = router;
