'use strict';

const router = require('express').Router();
const db = require('../db');

let _registerRoutes = (routes, method) => {
	for (let key in routes) {
		if (typeof routes[key] === 'object' && routes[key] !== null && !(routes[key] instanceof Array)) {
			_registerRoutes(routes[key], key);
		} else {
			if (method === 'get') {
				router.get(key, routes[key]);
			} else if (method === 'post') {
				router.post(key, routes[key]);
			} else {
				router.use(routes[key]);
			}
		}
	}
}

let route = routes => {
	_registerRoutes(routes);
	return router;
}

//Find a single user based on a key
let findOne = function (profileID) {
	return db.userModel.findOne({
		'profileId': profileID
	});
}

//Create a new user and returns that instance
let createNewUser = profile => {
	return new Promise((resolve, reject) => {
		let newChatUser = new db.userModel({
			profileId: profile.id,
			fullName: profile.displayName,
			profilePic: profile.photos[0].value || ''
		});

		newChatUser.save(error => {
			if (error) {
				reject(error);
			} else {
				resolve(newChatUser);
			}
		});
	});

}

// The ES6 promisified version of findById
let findById = id => {
	return new Promise((resolve, reject) => {
		db.userModel.findById(id, (error, user) => {
			if (error) {
				reject(error);
			} else {
				resolve(user);
			}
		});
	});
}

let addBookData = request => {
	//alert("Adding book data");
	//console.log(request)
	return new Promise((resolve, reject) => {
		let newBook = new db.bookModel({
			title: request.params.title,
			author: request.params.author,
			read: request.params.read,
			fiction: request.params.fiction,
			genre: request.params.genre,
			date: request.params.year
		});

		newBook.save(error => {
			if (error) {
				reject(new Error("Error saving book to repository"));
			} else {
				resolve(newBook);
			}

		});
	});
}


let findBookData = request => {

	return new Promise((resolve, reject) => {
		let searchRead = req.params.read;
		let searchFiction = req.params.fiction;
		let searchGenre = req.params.genre = "any" ? "" : req.params.genre;
		let searchYear = req.params.year = "any" ? "" : req.params.year;

		try {
			if (searchYear === "" & genre === "") {
				let books = db.find({
					read: searchRead,
					fiction: searchFiction
				});
			} else if (searchYear !== "" & genre === "") {
				let books = db.find({
					read: searchRead,
					fiction: searchFiction,
					year: searchYear
				});
			} else if (searchYear === "" & genre !== "") {
				let books = db.find({
					read: searchRead,
					fiction: searchFiction,
					genre: searchGenre
				});
			} else {
				let books = db.find({
					read: searchRead,
					fiction: searchFiction,
					genre: searchGenre,
					year: searchYear
				});
			}
		}
		catch(error){
			reject(new Error("Error during book search"));
		}
		
		resolve(books);
	});
}




module.exports = {
	route,
	findOne,
	createNewUser,
	findById,
	addBookData,
	findBookData
}