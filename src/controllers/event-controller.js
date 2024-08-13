import Event from '../models/Event.js';
import Address from '../models/Address.js';

export async function listEvents ( req, res )
{
    try
    {
        const events = await Event.findAll( {
            include: [ {
                model: Address,
                as: 'location'
            } ]
        } );

        const formattedEvents = events.map( event => ( {
            ...event.dataValues,
            formattedDate: event.formattedDate(),
            location: event.location.toString()
        } ) );

        return formattedEvents;
    } catch ( error )
    {
        console.error( 'Failed to fetch events:', error );
        throw error;
    }
}

export function adjustDateToUtcMidnight ( dateString )
{
    const date = new Date( dateString );
    date.setMinutes( date.getMinutes() + date.getTimezoneOffset() );
    return date;
}

export function createEventForm ( req, res )
{
    try
    {
        res.render( 'event-upsert' );
    } catch ( error )
    {
        console.error( 'Failed to create event form:', error );
        res.status( 400 ).send( error );
    }
}

export async function createEvent ( req, res )
{
    try
    {
        if ( req.body.date )
        {
            req.body.date = adjustDateToUtcMidnight( req.body.date );
        }

        await Event.create( req.body );
        res.redirect( '/' );
    } catch ( error )
    {
        console.error( 'Failed to create event:', error );
        res.status( 400 ).send( error );
    }
}

export async function getEvent ( req, res )
{
    try
    {
        const event = await Event.findByPk( req.params.id, {
            include: [ {
                model: Address,
                as: 'location'
            } ]
        } );
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

export async function updateEvent ( req, res )
{
    try
    {
        if ( req.body.date )
        {
            req.body.date = adjustDateToUtcMidnight( req.body.date );
        }

        const [ updated ] = await Event.update( req.body, {
            where: { id: req.params.id },
            returning: true,
            individualHooks: true
        } );

        if ( !updated )
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

export async function deleteEvent ( req, res )
{
    try
    {
        const deleted = await Event.destroy( {
            where: { id: req.params.id }
        } );

        if ( !deleted )
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