// models/Event.js
const mongoose = require( 'mongoose' );

const eventSchema = new mongoose.Schema( {
    date: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    timeframe: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false // Assuming description is optional
    }
} );

module.exports = mongoose.model( 'Event', eventSchema );