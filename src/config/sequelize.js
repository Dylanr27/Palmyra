import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
import fs from 'fs';

config();

const sequelizeInstance = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
        dialectOptions: {
            ssl: { ca: fs.readFileSync( '../../certs/ca-cert.pem' ) }
        }
    }
);

export default sequelizeInstance;