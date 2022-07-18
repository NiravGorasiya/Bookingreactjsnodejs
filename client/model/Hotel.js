const mongoose = require("mongoose")
const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    photos: {
        type: [String]
    },
    destination: {
        type: String,
        required: true
    },
    cheapestPrice: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    description: {
        type: String,
        required: true
    },
    feature: {
        type: Boolean,
        default: false
    },
    room: {
        type: [String]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Hotel", hotelSchema)