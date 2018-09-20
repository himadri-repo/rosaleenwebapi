// jshint esversion: 6

var express = require('express');
var router = express.Router();
var userModel = require('../shared/models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send(['respond with a resource']);
  userModel.find((err, result) => {
    let data = JSON.stringify(result);
    //console.log(userModel.schema);
    //  if(data.length>0) {
    //   console.log(data[0].fullname);
    // }
    //res.status(200).end(JSON.stringify(data));
    //res.end(data, 200);
    res.end(data);
  });
  // res.send([{
  //   "Name": "Himadri",
  //   "Department": "BDGS",
  //   "Salary": 10000,
  //   "EmployeeID": "EGIL058012"
  // }, {
  //   "Name": "Naresh",
  //   "Department": "BMAS",
  //   "Salary": 110000,
  //   "EmployeeID": "EGIL052014"
  // }, {
  //   "Name": "Pankaj",
  //   "Department": "BNMS",
  //   "Salary": 25000,
  //   "EmployeeID": "EGIL158116"
  // }, {
  //   "Name": "Alok",
  //   "Department": "BDGS",
  //   "Salary": 35000,
  //   "EmployeeID": "EGIL051065"
  // }]);
});

module.exports = router;
