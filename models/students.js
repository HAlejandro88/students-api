const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const Student = sequelize.define('Student', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    marks: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
});

module.exports = Student
