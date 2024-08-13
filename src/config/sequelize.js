import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
import fs from 'fs';

config();


const certPath = path.resolve( __dirname, '../../certs/ca-cert.pem' );
const caCert = fs.readFileSync( certPath );

const sequelizeInstance = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
        dialectOptions: {
            ssl: { caCert }
        }
    }
);

export default sequelizeInstance;