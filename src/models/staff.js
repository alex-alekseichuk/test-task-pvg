const { Sequelize, Model, DataTypes } = require('sequelize')

const sequelize = new Sequelize('sqlite::memory:')

const Employee = sequelize.define('Employee', {
  name: DataTypes.STRING,
})

module.exports = async function () {
  await sequelize.sync()
  return {
    Employee
  }
}