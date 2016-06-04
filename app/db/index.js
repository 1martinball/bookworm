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

const bwBook = new Mongoose.Schema({
	title: String,
	author: String,
	fiction: Boolean,
	read: Boolean,
	genre: String,
	date: String
});


let userModel = Mongoose.model('bwUser', bwUser);
let bookModel = Mongoose.model('bwBook', bwBook);

module.exports = {
	Mongoose,
	userModel,
	bookModel
}

