const db = require("../db.js");
const Sequelize = require('sequelize')


const User = db.define("user", {
	username: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
	},
	password: {
		type: Sequelize.STRING,
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		isEmail: true,
		unique: true,
	},
  first_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  last_name:{
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = User;
