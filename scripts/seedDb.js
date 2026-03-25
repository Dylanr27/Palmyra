import sequelize from '../src/config/sequelize.js';
import Event from '../src/models/Event.js';
import MenuItem from '../src/models/Menu-Item.js';
import Address from '../src/models/Address.js'; // Import Address model
import { config } from 'dotenv';

config();

async function seedModel ( model, data, modelName )
{
    try
    {
        const existingEntries = await model.findAll();
        if ( existingEntries.length > 0 )
        {
            console.log( `${ modelName } table already seeded. No action taken.` );
            return;
        }

        for ( const item of data )
        {
            const entry = await model.create( item );
            console.log( `${ modelName } saved:`, entry.title || entry.name || entry.alt );
        }
    } catch ( err )
    {
        console.error( `Error saving ${ modelName }:`, err );
    }
}

// Sample data to seed
const eventData = [
    {
        date: '2024-06-30',
        title: 'Spokane HoopFest',
        timeFrame: '7am-7pm',
        description: 'Downtown Spokane. Riverfront park / Central Plaza operating booth 91. Located next to the Registration Tent.',
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

const menuItemData = [
    {
        name: 'Mama Knows Best (Falafel Sandwich)',
        price: 13.00,
        description: 'Made from scratch, contains chickpeas, spices, fresh onion and garlic. Comes with tomatoes, pickles( cucumbers, turnips) lettuce, jalapeño and cucumbers. Tahini sauce(contains yogurt, and sesame) hummus paste (made fresh).',
        image: 'https://www.example.com/bacon-cheeseburger.jpg'
    },
    {
        name: 'Can\'t Go Wrong (Hummus side)',
        price: 8.00,
        description: 'Made from fresh chickpeas, olive oil, tahini (has sesame), serrano peppers and parsley. Comes with one pita bread. Pickles of your choice 5 cents.',
        image: 'https://www.example.com/chicken-tenders.jpg'
    },
    {
        name: 'Dulma',
        price: 4.00,
        description: '3 stuffed grape leaves.',
        image: 'https://www.example.com/mozzarella-sticks.jpg'
    },
    {
        name: 'Rainbow Falafel Salad',
        price: 10.00,
        description: 'Contains 3 pieces of falafel, side of hummus, side of tahini sauce and side salad.',
        image: 'https://www.example.com/caesar-salad.jpg'
    },
    {
        name: 'Pita Bread',
        price: 1.50,
        description: 'One slice of pita bread.',
        image: 'https://www.example.com/french-fries.jpg'
    },
    {
        name: 'Small Bag of Pita Chips',
        price: 2.00,
    },
    {
        name: '12oz Can of Sprite',
        price: 1.50,
    },
    {
        name: '16oz Bottle of Water',
        price: 1.50,
    }
];

const insertData = async () =>
{
    try
    {
        await sequelize.sync( { force: true } );

        for ( const event of eventData )
        {
            const address = await Address.create( event.location );
            event.locationId = address.id;
            delete event.location;
        }

        await seedModel( Event, eventData, 'Event' );
        await seedModel( MenuItem, menuItemData, 'MenuItem' );
        console.log( 'Database seeded successfully!' );
    } catch ( err )
    {
        console.error( 'Error seeding database:', err );
    } finally
    {
        await sequelize.close();
    }
};

insertData();