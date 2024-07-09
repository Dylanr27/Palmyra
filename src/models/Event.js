// models/Event.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const addressSchema = new Schema( {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true }
} );

// Override toString for address
addressSchema.methods.toString = function ()
{
    return `${ this.street }, ${ this.city }, ${ this.state }, ${ this.zipCode }`;
};

const eventSchema = new mongoose.Schema( {
    date: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    timeFrame: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: addressSchema,
        required: true
    }
} );

// Override toString for date using a virtual since Date is a built-in type
eventSchema.virtual( 'formattedDate' ).get( function ()
{
    return this.date.toLocaleDateString( 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } );
} );

export default mongoose.model( 'Event', eventSchema );