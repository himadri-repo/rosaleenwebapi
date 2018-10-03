// jshint esversion: 6
// jshint ignore:start
var express = require('express');
var router = express.Router();
var invoiceModel = require('../shared/models/invoice');
var customerModel = require('../shared/models/customer');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var query = {};
    if(req.query.start) {
        if(!query.date)
            query.date = {};

        query.date.$gte = new Date(req.query.start);
    }
    if(req.query.end) {
        if(!query.date)
            query.date = {};

        query.date.$lt = new Date(req.query.end);
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
        invoiceModel.find(query).sort('date').exec((err, result) => {
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
        invoiceModel.find().sort('date').exec((err, result) => {
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

// //Get rates by serviceid
// router.get('/:serviceid', function(req, res, next) {
//     let serviceid = parseInt(req.params.serviceid);
//     console.log(serviceid);
//     rateModel.find({"sid": serviceid}).exec((err, result)=> {
//         let rates = JSON.stringify(result);

//         res.send(rates);
//         res.status(200).end();
//     });
// });


router.post('/', function(req, res, next) {
    let invoice = new invoiceModel(req.body);
    let customer = null;
    let customerCount = 0;
    customerModel.findOne({'mobile': invoice.customer.mobile}).exec((err, result) => {
        if(!err) {
            if(result)
                customer = result;
        }
        customerModel.count({}, (err1, count) => {
            customerCount = count;

            console.log('customerCount : ' + customerCount);
            console.log('customer (1)-> ' + JSON.stringify(customer));
    
            invoiceModel.count({}, (err, cnt) => {
                if(err) {
                    res.send({error: err, status: 'Error occured'});
                    res.status(200).end();
                }
                invoice.id = cnt+1;
                invoice.date = Date.now();
                if(invoice.technician.name) {
                    invoice.technician.name = invoice.technician.name.trim();
                }
                invoice.save(function(error, updatedInvoice) {
                    if(!customer) {
                        customer = new customerModel({id: customerCount+1, name: updatedInvoice.customer.name, 
                            mobile: updatedInvoice.customer.mobile, active: true, createDate: Date.now(), 
                            lastVisited: Date.now()
                        });
    
                        console.log('creating customer');
                    }
                    else {
                        customer.lastVisited = Date.now();
                    }
                    console.log('customer -> ' + JSON.stringify(customer));
    
                    customer.save(function(err, updatedCustomer) {
                        if(err)
                            console.log('Unable to save customer (' + err + ')');
                        else {
                            console.log('Customer: ' + JSON.stringify(updatedCustomer));
                        }
                    })
        
                    if(error) {
                        res.send({error: error, status: 'Error'});
                        res.status(200).end();
                    }
                    res.send({error: '', status: 'Record saved to DB', data: updatedInvoice});
                    res.status(200).end();
                });
            });
        });
    });
});

module.exports = router;

// jshint ignore:end