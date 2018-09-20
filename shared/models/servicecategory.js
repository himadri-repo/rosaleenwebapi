//jshint esversion: 6
var mongoose = require('mongoose');

var serviceCategorySchema = new mongoose.Schema({
    'id': Number,
    'name': String,
    'active': Boolean,
    'parent_id': Number,
    'operation_time': Number
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
var serviceModel = mongoose.model('service_categories', serviceCategorySchema);

module.exports = serviceModel;