import Event from '../models/Event.js';



async function listEvents ()
{
    try
    {
        const events = await Event.find(); // Fetch all events
        return events; // Return the events
    } catch ( error )
    {
        console.error( 'Failed to fetch events:', error );
        throw error; // Throw the error to be handled by the caller
    }
}

// Helper function to adjust date to UTC midnight
function adjustDateToUtcMidnight ( dateString )
{
    const date = new Date( dateString );
    date.setMinutes( date.getMinutes() + date.getTimezoneOffset() );
    return date;
}

// Create a new event
async function createEvent ( req, res )
{
    try
    {
        // Adjust the date to UTC midnight
        if ( req.body.date )
        {
            req.body.date = adjustDateToUtcMidnight( req.body.date );
        }

        const newEvent = new Event( req.body );
        await newEvent.save();
        res.status( 201 ).send( newEvent );
    } catch ( error )
    {
        console.error( 'Failed to create event:', error );
        res.status( 400 ).send( error );
    }
}

// Get a single event by ID
async function getEvent ( req, res )
{
    try
    {
        console.log( req.params.id );
        const event = await Event.findById( req.params.id );
        if ( !event )
        {
            return res.status( 404 ).send();
        }
        res.render( 'event-views/event-upsert', { event: event } );
    } catch ( error )
    {
        console.error( 'Failed to get event:', error );
        res.status( 500 ).send( error );
    }
}

// Update an event by ID
async function updateEvent ( req, res )
{
    try
    {
        // Adjust the date to UTC midnight
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

// Delete an event by ID
async function deleteEvent ( req, res )
{
    try
    {
        const event = await Event.findByIdAndDelete( req.params.id );
        if ( !event )
        {
            return res.status( 404 ).send();
        }
        res.send( event );
    } catch ( error )
    {
        console.error( 'Failed to delete event:', error );
        res.status( 500 ).send( error );
    }
}

// Export the controller functions
export default { listEvents, createEvent, getEvent, updateEvent, deleteEvent };