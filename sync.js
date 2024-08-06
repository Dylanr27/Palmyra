import sequelize from './src/config/sequelize.js';
import './src/models/Address.js';
import './src/models/Event.js';
import './src/models/Menu-Item.js';

sequelize.sync( { force: true } ).then( () =>
{
    console.log( 'Database & tables created!' );
} ).catch( error =>
{
    console.error( 'Error creating database & tables:', error );
} );