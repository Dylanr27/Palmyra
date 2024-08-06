import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';
import Address from './Address.js';

const Event = sequelize.define( 'Event', {
    date: { type: DataTypes.DATE, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    timeFrame: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    locationId: { type: DataTypes.INTEGER, allowNull: false }
}, {
    indexes: [
        {
            unique: true,
            fields: [ 'date', 'title' ]
        }
    ]
} );

Event.prototype.formattedDate = function ()
{
    return this.date.toLocaleDateString( 'en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    } );
};

Event.belongsTo( Address, { as: 'location', foreignKey: 'locationId' } );

export default Event;