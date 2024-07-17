import express from 'express';
import photoController from '../controllers/photo-controller.js';

const router = express.Router();

// Middleware to log route calls
const logRouteCall = ( req, res, next ) => 
{
    console.log( `Route called:  ${ req.method } ${ req.path }` );
    next();
};

router.use( logRouteCall );

router.get( '/', photoController.listPhotos );
router.get( '/create', photoController.createPhotoForm );
router.post( '/createPhoto', photoController.createPhoto );
router.get( '/:id', photoController.getPhoto );
router.delete( '/delete/:id', photoController.deletePhoto );

export default router;