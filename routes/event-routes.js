// routes/event.js
const express = require( 'express' );
const router = express.Router();
const eventsController = require( '../controllers/event-controller' );

// Define routes for CRUD operations
router.get( '/', eventsController.listEvents ); // List all events
router.post( '/', eventsController.createEvent ); // Create a new event
router.get( '/:eventId', eventsController.getEvent ); // Get a single event by ID
router.put( '/:eventId', eventsController.updateEvent ); // Update an event by ID
router.delete( '/:eventId', eventsController.deleteEvent ); // Delete an event by ID

module.exports = router;