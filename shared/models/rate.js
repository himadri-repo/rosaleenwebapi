// jshint esversion: 6
let mongoose = require('mongoose');

var ratesSchema = new mongoose.Schema({
    '_id': mongoose.Schema.Types.ObjectId,
    'id': Number,
    'sid': Number,
    'active': Boolean,
    'location': String,
    'rate': Number,
    'service': {type: mongoose.Schema.Types.ObjectId, ref: 'services'}
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
                delete ret.__v;
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
//         return this.name.firstName + ' ' + this.name.lastName;
//     }
//     catch(e) {
//         return e;
//     }
// });
//console.log(fullName);

var rateModel = mongoose.model('rates', ratesSchema);

// userModel.schema.options.toJSON = function(doc, ret, options) {
//     ret.iid = ret._id;
//     delete ret._id;
//     delete ret.__v;
//     return ret;
// };

module.exports = rateModel;