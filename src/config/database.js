// FILE: database.js
import sequelizeInstance from './sequelize.js';

const connectDb = async () =>
{
    try
    {
        await sequelizeInstance.authenticate();
        console.log( 'MySQL Connected...' );
    }
    catch ( err )
    {
        console.error( 'Unable to connect to the database:', err );
        process.exit( 1 );
    }
};

export default connectDb;