//jshint esversion: 6
var express = require('express');
var router = express.Router();
var rateModel = require('../shared/models/rate');

//Get all rates
router.get('/', function(req, res, next) {
    rateModel.find((err, result) => {
        let rates = JSON.stringify(result);
        res.send(rates);
        res.status(200).end();
    });
});

//Get rates by serviceid
router.get('/:serviceid', function(req, res, next) {
    let serviceid = parseInt(req.params.serviceid);
    console.log(serviceid);
    rateModel.find({"sid": serviceid}).exec((err, result)=> {
        let rates = JSON.stringify(result);

        res.send(rates);
        res.status(200).end();
    });
});

//Get rates by serviceid and indoor/outdoor
router.get('/:serviceid/:location', function(req, res, next) {
    let serviceid = parseInt(req.params.serviceid);
    let location = req.params.location;
    console.log(serviceid + ' - ' + location);
    rateModel.find({"sid": serviceid, 'location': location}).exec((err, result)=> {
        let rates = JSON.stringify(result);

        res.send(rates);
        res.status(200).end();
    });
});


module.exports = router;