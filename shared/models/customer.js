//jshint esversion: 6
var mongoose = require('mongoose');

var customerSchema = new mongoose.Schema({
    'id': Number,
    'name': String,
    'mobile': String,
    'active': Boolean,
    'createDate': Date,
    'lastVisited': Date
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true,
        transform: function(doc, ret) {
            try
            {
                delete ret._id;
                // delete ret.token;
                // delete ret.password;
                delete ret.__v;
                // delete ret.name;

                // ret.uid = ret.userName;
                // delete ret.userName;
            }
            catch(e) {
                console.log(e);
            }
        }
    }
});

// var userName = userSchema.virtual('username').get(function() {
//     try {
//         //console.log(this.name);
//         //console.log(JSON.stringify(this));
//         return this.name.firstname + ' ' + this.name.lastname;
//     }
//     catch(e) {
//         return e;
//     }
// });
//console.log(fullName);

var customerModel = mongoose.model('customers', customerSchema);

// userModel.schema.options.toJSON = function(doc, ret, options) {
//     ret.iid = ret._id;
//     delete ret._id;
//     delete ret.__v;
//     return ret;
// };

module.exports = customerModel;