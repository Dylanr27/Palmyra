import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Address = sequelize.define( 'Address', {
    street: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: false },
    zipCode: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false }
} );

Address.prototype.toString = function ()
{
    return `
        ${ this.street },
        ${ this.city }, 
        ${ this.state },
        ${ this.zipCode }
    `;
};

export default Address;