const express = require( 'express' );
const app = express();
const port = 3000;
const path = require( 'path' );
const bodyParser = require( 'body-parser' );
const emailService = require( './services/EmailService' );

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );

app.use( express.static( 'public' ) );

app.get( '/', ( req, res ) =>
{
    res.sendFile( path.join( __dirname, 'views', 'index.html' ) );
} );

// Route to send feedback
app.post( '/submit-feedback', ( req, res ) =>
{
    const { name, email, message } = req.body;
    emailService.sendEmail( name, email, message )
        .then( () =>
        {
            console.log( 'Email sent!' );
            res.redirect( '/' );
        } )
        .catch( ( error ) => res.status( 500 ).send( error.message ) );
} );

app.listen( port, () =>
    console.log( `App listening at http://localhost:${ port }` ) );