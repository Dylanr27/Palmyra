import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
import fs from 'fs';

config();

// Get the base64 encoded certificate from the environment variable
const base64Cert = process.env.MYSQL_CA_CERT;

// Decode the base64 string
const certBuffer = Buffer.from( base64Cert, 'base64' );

const sequelizeInstance = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        dialect: 'mysql',
        dialectOptions: {
            ssl: {
                ca: certBuffer.toString()
            }
        }
    }
);

export default sequelizeInstance;