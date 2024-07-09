import Event from '../models/Event.js';

async function listEvents()
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


function createEvent( req, res )
{
    // Logic to create a new event
}

function getEvent( req, res )
{
    // Logic to get a single event by ID
}

function updateEvent( req, res )
{
    // Logic to update an event by ID
}

function deleteEvent( req, res )
{
    // Logic to delete an event by ID
}

export default { listEvents, createEvent, getEvent, updateEvent, deleteEvent };