const db = require("../db.js");
const Sequelize = require("sequelize");

const Ingredient = db.define("ingredient", {
	name: {
		type: Sequelize.STRING,
	},
	calories: {
		type: Sequelize.FLOAT,
	},
	image_URL: {
		typeof: Sequelize.STRING,
	},
	protein: {
		type: Sequelize.FLOAT,
	},
	fat: {
		type: Sequelize.FLOAT,
	},
	carbs: {
		type: Sequelize.FLOAT,
	},
	expiry: {
		type: Sequelize.INTEGER,
	},
	unit: {
		type: Sequelize.STRING,
	},
});

module.exports = Ingredient;
