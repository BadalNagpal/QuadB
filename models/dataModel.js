const mongoose = require('mongoose')

const Schema = mongoose.Schema
//name, last, buy, Sell, volume, base_unit 
const dataSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    last: {
        type: String,
        required: true
    },
    buy: {
        type: String,
        required: true
    },
    sell: {
        type: String,
        required: true
    },
    volume: {
        type: String,
        required: true
    },
    base_unit: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Data', dataSchema)