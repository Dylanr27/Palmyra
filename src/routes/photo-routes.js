import express from 'express';
import photoController from '../controllers/photo-controller.js';
import multer from 'multer';

const router = express.Router();
// Define storage strategy

// Middleware to log route calls
const logRouteCall = ( req, res, next ) => 
{
    console.log( `Route called:  ${ req.method } ${ req.path }` );
    next();
};

const storage = multer.diskStorage( {
    destination: function ( req, file, cb )
    {
        cb( null, 'public/images/' );
    },
    filename: function ( req, file, cb )
    {
        const uniqueSuffix = Date.now() + '-' + Math.round( Math.random() * 1E9 );
        cb( null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split( '.' ).pop() );
    }
} );

const upload = multer( { storage: storage } );

router.use( logRouteCall );

router.get( '/', photoController.listPhotos );
router.get( '/create', photoController.createPhotoForm );
router.post( '/createPhoto', upload.single( 'url' ), photoController.createPhoto );
router.get( '/:id', photoController.getPhoto );
router.delete( '/delete/:id', photoController.deletePhoto );

export default router;