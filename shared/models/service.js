//jshint esversion: 6
var mongoose = require('mongoose');

var serviceSchema = new mongoose.Schema({
    '_id': mongoose.Schema.Types.ObjectId,
    'id': Number,
    'name': String,
    'description': String,
    'category_id': Number,
    'operation_time': Number,
    'rates': [{type: mongoose.Schema.Types.ObjectId, ref: 'rates'}]
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

var serviceModel = mongoose.model('services', serviceSchema);

// userModel.schema.options.toJSON = function(doc, ret, options) {
//     ret.iid = ret._id;
//     delete ret._id;
//     delete ret.__v;
//     return ret;
// };

module.exports = serviceModel;