import express from 'express';
import sendEmail from '../services/EmailService.js';

const router = express.Router();

router.post( '/', async ( req, res ) =>
{
    try
    {
        console.log( "Feedback route hit" );
        const { name, email, message } = req.body;
        await sendEmail( name, email, message );
        console.log( 'Email sent!' );
        res.redirect( '/' );
    } catch ( error )
    {
        console.log( error );
        res.status( 500 ).send( error.message );
    }
} );

export default router;