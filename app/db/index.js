'use strict';

const config = require('../config');
const Mongoose = require('mongoose').connect(config.dbURI);

Mongoose.connection.on('error', error => {
	console.log('Momgodb connection error: ', error);
});

//Create a schema that defines the structure for storing user data
const bwUser = new Mongoose.Schema({
	firstname: String,
	lastname: String,
	username: String,
	password: String
});

const bwBook = new Mongoose.Schema({
	users : [bwUser],
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

