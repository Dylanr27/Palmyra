// FILE: database.js
import sequelizeInstance from './sequelize.js';

const connectDb = async () =>
{
    await sequelizeInstance.authenticate()
        .then( () =>
        {
            console.log( 'Connection has been established successfully.' );
        } )
        .catch( err =>
        {
            console.error( 'Unable to connect to the database:', err );
        } );
};

export default connectDb;