import express from 'express';
import eventController from '../controllers/event-controller.js';

const router = express.Router();

// Middleware to log route calls
const logRouteCall = ( req, res, next ) => 
{
    console.log( `Route called: ${ req.method } ${ req.path }` );
    next();
};

router.use( logRouteCall );

router.get( '/', eventController.listEvents );
router.post( '/create', eventController.createEvent );
router.get( '/:id', eventController.getEvent );
router.post( '/update/:id', eventController.updateEvent );
router.delete( '/delete:id', eventController.deleteEvent );

export default router;