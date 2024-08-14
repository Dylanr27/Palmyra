import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

config();

// Get the directory name of the current module
const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );

// Resolve the absolute path to the certificate file
const certPath = path.resolve( __dirname, '../../certs/DigiCertGlobalRootCA.crt.pem' );

console.log( 'Connecting to database with the following details:' );
console.log( `Host: ${ process.env.MYSQL_HOST }` );
console.log( `Database: ${ process.env.MYSQL_DATABASE }` );
console.log( `User: ${ process.env.MYSQL_USER }` );
console.log( `Password: ${ process.env.MYSQL_PASSWORD }` );

const sequelizeInstance = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
        dialectOptions: {
            ssl:
            {
                ca: fs.readFileSync( certPath )
            }

        }
    }
);

export default sequelizeInstance;