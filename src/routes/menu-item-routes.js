import express from 'express';
import menuItemController from '../controllers/menu-item-controller.js';

const router = express.Router();

// Middleware to log route calls
const logRouteCall = ( req, res, next ) => 
{
    console.log( `Route called:  ${ req.method } ${ req.path }` );
    next();
};

router.use( logRouteCall );

router.get( '/', menuItemController.listMenuItems );
router.get( '/create', menuItemController.createMenuItemForm );
router.post( '/createMenuItem', menuItemController.createMenuItem );
router.get( '/:id', menuItemController.getMenuItem );
router.post( '/update/:id', menuItemController.updateMenuItem );
router.delete( '/delete/:id', menuItemController.deleteMenuItem );

export default router;