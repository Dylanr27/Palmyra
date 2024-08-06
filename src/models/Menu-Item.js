// FILE: models/MenuItem.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const MenuItem = sequelize.define( 'MenuItem', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
} );

export default MenuItem;