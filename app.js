import express from 'express';
// import session from 'express-session';
import connectDB from './src/config/database.js';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import feedbackRouter from './src/routes/feedback.js';
import { insertData } from './scripts/seedDb.js';
import eventRoutes from './src/routes/event-routes.js';
import eventController from './src/controllers/event-controller.js';

config();
connectDB().then( insertData );

const app = express();
app.use( express.json() );
const port = process.env.PORT || 3000;

app.set( 'view engine', 'ejs' );

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( express.static( 'public' ) );
app.use( '/events', eventRoutes );
app.use( '/submit-feedback', feedbackRouter );

// app.use( session({
//     secret: process.env.SESSION_SECRET_KEY,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }
// }) );

app.get( '/', async ( req, res ) =>
{
    try
    {
        const events = await eventController.listEvents();
        res.render( 'index', { events: events } );
    } catch ( error )
    {
        console.error( 'Failed to fetch events:', error );
        res.status( 500 ).send( 'Server error' );
    }
} );

app.listen( port, () => console.log( `App listening at http://localhost:${ port }` ) );