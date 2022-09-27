const { DataTypes } = require("sequelize");
const db = require("./db");

const Staff = db.define("staff", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  ShareholderID: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  IdentityCard: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  IsShareholder:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  Earnings: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  DayOff: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  PaidLastYear: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  PaidToCate: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});
db.sync();
module.exports = Staff;
