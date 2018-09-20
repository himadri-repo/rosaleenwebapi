// jshint esversion: 6
var express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var config = require('../shared/config');
var UserModel = require('../shared/models/user');
var router = express.Router();

mongoose.connect(config.database);

router.use(function(req, res, next) {
    console.log(req.originalUrl);
    var token = req.body.token || req.param.token || req.headers['x-access-token'];

    if(req.originalUrl.indexOf('register')>-1 || 
        req.originalUrl.indexOf('amivalid')>-1) {
        next();
    }
    else
    {
        if(!token) {
            res.status(401).send({'status': false, 'message': 'Invalid or missing token'});
            return;
            //res.end();
            //next();
        }

        returnValue = validateToken(token);

        if(returnValue)
        {
            console.log(returnValue);
            if(returnValue.status) {
                //valid token
                res.status(200).send(returnValue);
                next();
            }
            else
            {
                //invalid token
                res.status(401).send(returnValue);
                //res.end();
            }
        }
        else
        {
            //invalid token
            res.status(401).send({'status': false, 'message': 'Invalid or missing token'});
            //res.end();
        }
    }
});

router.get('/', function(req, res) {
    console.log(req.app.get('key'));
    res.status(200).send("Welcome to authorization service of this API");
});

router.post('/register', function(req, res) {
    console.log(req.body);
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    var numberOfUsers = 0;

    UserModel.find(function(err, data) {
        if(err)
        {
            console.log(err);
        }
        numberOfUsers = data.length;
        console.log("No of users: " + numberOfUsers);
    }).then(data => {
        var token = jwt.sign({'id': numberOfUsers+1, 'userName': req.body.userName, 'email': req.body.email}, config.secret, 
        {
            algorithm: 'HS256',
            expiresIn: 86400
        });
    
        UserModel.create({
            'id': numberOfUsers+1,
            'name': {
                'firstName': req.body.firstName,
                'lastName': req.body.lastName
            },
            'userName': req.body.userName,
            'password': hashedPassword,
            'email': req.body.email,
            'token': token,
            'isactive': true
        }, function(err, user) {
            if(err)
            {
                console.log(err);
                res.status(500).send({'errorCode': 500, 'message': err, 'operation': 'New user registration'});
            }
            
            console.log(user);
    
            res.status(200).send(
                {
                    'errorCode': 0, 
                    'message': 'User ' + user.name.firstName + ' ' + user.name.lastName,
                    'operation': 'New user registration',
                    'token': token
                });
            return;
        });
    });
});

router.get('/amivalid', function(req, res) {
    var token = req.body.token || req.param.token || req.headers['x-access-token'];
    //console.log(token);
    if(!token) {
        res.status(401).send('Invalid or missing token');
    }

    returnValue = validateToken(token);
    if(returnValue)
    {
        console.log(returnValue);
        if(returnValue.status) {
            //valid token
            res.status(200).send(returnValue);
        }
        else
        {
            //invalid token
            res.status(401).send(returnValue);
        }
    }
    else {
        //invalid token
        res.status(401).send({'status': false, 'message': 'Invalid or missing token'});
    }
});

/* helper methods */
var validateToken = function(token) {
    if(!token) return false;
    var responseValue = {};

    jwt.verify(token, config.secret, function(err, decoded) {
        if(err)
            return {'status': false, 'message': err};

        console.log('Token verified');
        //responseValue = {'status': true, 'message': 'token is valid (' + JSON.stringify(decoded) + ')'};
        responseValue = {'status': true, 'message': 'token is valid'};
    });

    return responseValue;
};

module.exports = router;
