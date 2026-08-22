const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'booking_id'
  },
  trip_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'booking_type'
  },
  provider: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'details'
  },
  cost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00,
    field: 'amount'
  },
  start_time: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'booked_at'
  },
  end_time: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'confirmed',
    field: 'booking_status'
  }
}, {
  tableName: 'bookings',
  timestamps: false,
  underscored: true
});

module.exports = Booking;
