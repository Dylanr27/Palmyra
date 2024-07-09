import express from 'express';
import eventController from '../controllers/event-controller.js';

const router = express.Router();

router.get( '/', eventController.listEvents );
router.post( '/', eventController.createEvent );
router.get( '/:id', eventController.getEvent );
router.put( '/:id', eventController.updateEvent );
router.delete( '/:id', eventController.deleteEvent );

export default router;