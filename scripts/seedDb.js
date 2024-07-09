import mongoose from 'mongoose';
import Event from '../src/models/Event.js';
import { config } from 'dotenv';

config();

// MongoDB connection string
const dbURI = process.env.MONGODB_URI;

mongoose.connect( dbURI )
    .then( () => console.log( 'MongoDB connected, seeding will commence next' ) )
    .catch( err => console.log( err ) );

// Sample data to seed, including address
const eventData = [
    {
        date: '2024-06-30',
        title: 'Spokane HoopFest',
        timeFrame: '7am-7pm',
        description: 'Downtown Spokane. Riverfront park / Central Plaza operating booth 91. Located next to the Registration Tent. ',
        location: {
            street: '421 W Riverside Ave #115',
            city: 'Spokane',
            state: 'WA',
            zipCode: '99201',
            country: 'USA'
        }
    },
    {
        date: '2024-07-03',
        title: 'Delridge Farmer\'s Market',
        timeFrame: '10am-2pm',
        description: 'Small business, Farmers\' market in Seattle, Washington',
        location: {
            street: '9421 18th ave SW',
            city: 'Seattle',
            state: 'WA',
            zipCode: '98106',
            country: 'USA'
        }
    },
    {
        date: '2024-07-13',
        title: 'Delridge Farmer\'s Market',
        timeFrame: '10am-2pm',
        description: 'Small business, Farmers\' market in Seattle, Washington',
        location: {
            street: '9421 18th ave SW',
            city: 'Seattle',
            state: 'WA',
            zipCode: '98106',
            country: 'USA'
        }
    },
    {
        date: '2024-08-04',
        title: 'Jet City Lab',
        timeFrame: '10am-2pm',
        description: 'Jet City Laboratory is a cultural incubator & 1500sq foot creative space located in the heart of West Seattle\'s Alaska Junction.',
        location: {
            street: '4547 California Ave SW Suite A',
            city: 'Seattle',
            state: 'WA',
            zipCode: '98116',
            country: 'USA'
        }
    }
];

// Function to insert data and close connection
const insertData = async () =>
{
    try
    {
        // Check if the event table already has entries
        const existingEntries = await Event.find();
        if ( existingEntries.length > 0 )
        {
            console.log( 'Event table already seeded. No action taken.' );
            return; // Exit the function early if entries exist
        }

        for ( const data of eventData )
        {
            const event = new Event( data );
            await event.save();
            console.log( 'Event saved:', event.title );
        }
    } catch ( err )
    {
        console.error( 'Error saving event:', err );
    }
};

export { insertData };