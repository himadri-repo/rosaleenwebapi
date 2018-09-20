//jshint esversion: 6
var mongoose = require('mongoose');

var invoiceSchema = new mongoose.Schema({
    'id': Number,
    'date': Date,
    'customer': {
        'name': String,
        'mobile': String
    },
    'paymentMethod': String,
    'active': Boolean,
    'selectedServices': [{
        'id': Number,
        'name': String,
        'description': String,
        'category_id': Number,
        'operation_time': Number,
        'active': Boolean,
        'image': String,
        'technician': {
            'technician': Number,
            'name': String
        },
        commercial: {
            'quantity': Number,
            'rate': Number,
            'value': Number
        }
    }],
    'productValue': Number,
    'discountRate': Number,
    'discountValue': Number,
    'totalValue': Number
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
                delete ret.token;
                delete ret.password;
                delete ret.__v;
                delete ret.name;

                ret.uid = ret.userName;
                delete ret.userName;
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

var invoiceModel = mongoose.model('invoices', invoiceSchema);

// userModel.schema.options.toJSON = function(doc, ret, options) {
//     ret.iid = ret._id;
//     delete ret._id;
//     delete ret.__v;
//     return ret;
// };

module.exports = invoiceModel;