const db = require("../db.js");
const Sequelize = require("sequelize");

const Pantry = db.define("pantry", {});

module.exports = Pantry;
