// jshint esversion: 6
// jshint ignore:start
var express = require('express');
var router = express.Router();
var customerModel = require('../shared/models/customer');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var query = {};
    if(req.query.start) {
        if(!query.lastVisited)
            query.lastVisited = {};

        query.lastVisited.$gte = new Date(req.query.start);
    }
    if(req.query.end) {
        if(!query.lastVisited)
            query.lastVisited = {};

        query.lastVisited.$lt = new Date(req.query.end);
    }
    if(req.query) {
        // if(!query.customer)
        //     query.customer = {};
        for(var key in req.query)
        {
            if(key.toLowerCase()==='start' || key.toLowerCase()==='end') {
                continue;
            }

            query[key] = req.query[key];
        }
        //query['customer.mobile'] = req.query.customer.toString();
        //query.customer.mobile = req.query.customer.toString();
    }

    console.log('Query -> ' + JSON.stringify(query));

    if(query) {
        customerModel.find(query).sort('mobile').exec((err, result) => {
            //console.log(err);
            if(!err) {
                let data = result; //JSON.stringify(result);
                res.status(200).json(data).end();
            }
            else
            {
                res.status(502).send(err).end();
            }
        });
    }
    else {
        customerModel.find().sort('mobile').exec((err, result) => {
            if(!err) {
                //let data = JSON.stringify(result);
                let data = result;
                res.status(200).json(data).end();
            }
            else {
                res.status(502).send(err).end();
            }
        });
    }
});

module.exports = router;

// jshint ignore:end