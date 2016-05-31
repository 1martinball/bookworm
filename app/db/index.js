'use strict';

const config = require('../config');
const Mongoose = require('mongoose').connect(config.dbURI);

Mongoose.connection.on('error', error => {
	console.log('Momgodb connection error: ', error);
});

//Create a schema that defines the structure for storing user data
const bwUser = new Mongoose.Schema({
	profileId: String,
	fullName: String,
	profilePic: String
});

//turn the schema into a usable model
let userModel = Mongoose.model('bwUser', bwUser);

module.exports = {
	Mongoose,
	userModel
}

