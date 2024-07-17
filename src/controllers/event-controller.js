import Event from '../models/Event.js';



async function listEvents()
{
    try
    {
        const events = await Event.find();
        return events;
    } catch ( error )
    {
        console.error( 'Failed to fetch events:', error );
        throw error;
    }
}


function adjustDateToUtcMidnight( dateString )
{
    const date = new Date( dateString );
    date.setMinutes( date.getMinutes() + date.getTimezoneOffset() );
    return date;
}

function createEventForm( req, res )
{
    try
    {
        res.render( 'event-upsert' );
    } catch ( error )
    {
        console.error( 'Failed to create event:', error );
        res.status( 400 ).send( error );
    }
}


async function createEvent( req, res )
{
    try
    {
        
        if ( req.body.date )
        {
            req.body.date = adjustDateToUtcMidnight( req.body.date );
        }

        const newEvent = new Event( req.body );
        await newEvent.save();
        res.redirect( '/' );
    } catch ( error )
    {
        console.error( 'Failed to create event:', error );
        res.status( 400 ).send( error );
    }
}


async function getEvent( req, res )
{
    try
    {
        const event = await Event.findById( req.params.id );
        if ( !event )
        {
            return res.status( 404 ).send();
        }
        res.render( 'event-upsert', { event: event } );
    } catch ( error )
    {
        console.error( 'Failed to get event:', error );
        res.status( 500 ).send( error );
    }
}


async function updateEvent( req, res )
{
    try
    {
        
        if ( req.body.date )
        {
            req.body.date = adjustDateToUtcMidnight( req.body.date );
        }

        const event = await Event.findByIdAndUpdate( req.params.id, req.body, { new: true, runValidators: true } );
        if ( !event )
        {
            return res.status( 404 ).send();
        }
        res.redirect( '/' );
    } catch ( error )
    {
        console.error( 'Failed to update event:', error );
        res.status( 400 ).send( error );
    }
}


async function deleteEvent( req, res )
{
    try
    {
        const event = await Event.findByIdAndDelete( req.params.id );
        if ( !event )
        {
            return res.status( 404 ).send();
        }
        res.redirect( '/' );
    } catch ( error )
    {
        console.error( 'Failed to delete event:', error );
        res.status( 500 ).send( error );
    }
}


export default { listEvents, createEventForm, createEvent, getEvent, updateEvent, deleteEvent };