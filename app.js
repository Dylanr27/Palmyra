import express from 'express';
// import session from 'express-session';
import connectDB from './src/config/database.js';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import { insertData } from './scripts/seedDb.js';
import authRoutes from './path/to/auth-routes.js';
import eventController from './src/controllers/event-controller.js';
import eventRoutes from './src/routes/event-routes.js';
import menuItemController from './src/controllers/menu-item-controller.js';
import menuItemRoutes from './src/routes/menu-item-routes.js';
import Photo from './src/models/Photo.js';
import photoController from './src/controllers/photo-controller.js';
import photoRoutes from './src/routes/photo-routes.js';
import feedbackRouter from './src/routes/feedback.js';

config();
connectDB().then( insertData );

const app = express();
app.use( express.json() );
const port = process.env.PORT || 3000;

app.set( 'view engine', 'ejs' );

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( express.static( 'public' ) );
app.use( '/auth', authRoutes );
app.use( '/events', eventRoutes );
app.use( '/menu-items', menuItemRoutes );
app.use( '/photos', photoRoutes );
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
        const menuItems = await menuItemController.listMenuItems();
        const businessPhotos = await Photo.find({ group: 'Business' });
        const customerPhotos = await Photo.find({ group: 'Customer' });

        res.render( 'index', { events: events, menuItems: menuItems, businessPhotos: businessPhotos, customerPhotos: customerPhotos } );
    } catch ( error )
    {
        console.error( 'Fetch Failed:', error );
        res.status( 500 ).send( 'Server error' );
    }
} );

app.listen( port, () => console.log( `App listening at http://localhost:${ port }` ) );