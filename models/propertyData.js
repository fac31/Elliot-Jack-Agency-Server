const mongoose = require('mongoose')

const propertyDataSchema = new mongoose.Schema({
    propertyImg: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    sold: {
        type: Boolean,
        required: true
    },
    description: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Property Data', propertyDataSchema)