// jshint esversion: 6
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ProductModel = require('../shared/models/product');

// mongodb://admin:admin@ds249718.mlab.com:49718/ecommerce

/*
router.use(function(req, res, next) {
    console.log(req.headers['user-agent']);
    next();
}); */

 // console.log(ProductModel.getProductItems);
/* GET users listing. */
router.get('/', function(req, res, next) {
    return ProductModel.getProductItems("5a968c61734d1d3655e985cb").then(value => {
        console.log(value);
        /*res.send({
            "id": value.id,
            "name": value.name,
            "code": value.code,
            "isavailable": value.isavailable,
            "price": value.price,
            "rating": value.rating,
            "imageurl": value.imageurl
        });*/

        res.status(200).send(value).end();
    });
});

module.exports = router;