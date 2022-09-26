const {  DataTypes } = require('sequelize');
const db = require('./db')

const Staff = db.define('staff', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey : true
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Birthday: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Gender: {
      type: DataTypes.STRING,
      allowNull: true
    },
    IdentityCard: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Ethnic: {
      type: DataTypes.STRING,
      allowNull: true
    },
    TypeOfEmployee: {
      type: DataTypes.STRING,
      allowNull: true
    },
    DayOff: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
});
db.sync();
module.exports = Staff;