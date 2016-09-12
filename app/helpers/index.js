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
let findUser = username => {
	console.log("Searching for user : " + username);
	return new Promise((resolve, reject) => {
		console.log("Querying db");
		db.userModel.findOne({
			username: username
		}, (error, user) => {
			if (error) {
				console.log("In error about to reject findUser")
				reject(error);
			} else if (user === null) {
				console.log("About to resolve findUser : " + user)
				resolve(user);
			} else {
				console.log("user is : " + user)
				console.log("User is found about to reject findUser : " + user);
				//reject(new Error());
				resolve(user);
			}
		});
	});
}

let isPasswordValid = (enteredPassword, expectedPassword) => {
	if(enteredPassword === expectedPassword){
		return true;
	}
	return false;
}

//Create a new user and returns that instance
let createNewUser = req => {
	return new Promise((resolve, reject) => {
		let newChatUser = new db.userModel({
			username: req.body.username,
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			password: req.body.password
		});
		console.log("NewChatUser with username " + newChatUser.username + " created");
		findUser(newChatUser.username).then(user => {
			console.log("user is : " + user);
			if (user === null) {
				newChatUser.save(error => {
					if (error) {
						reject(error);
					} else {
						console.log("About to resolve newChatUser");
						resolve(newChatUser);
					}
				});
			} else {
				reject(new Error("Username already taken. Please try again."));
			}

		}).catch(error => {
			console.log(error);
			reject(error);
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
			title: request.body.title,
			author: request.body.author,
			read: request.body.read,
			fiction: request.body.fiction,
			genre: request.body.genre,
			date: request.body.year
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


let findBookData = req => {

	return new Promise((resolve, reject) => {
		let read = req.query.read;
		let fiction = req.query.fiction;
		let genre = req.query.genre;
		let year = req.query.year;
		let findQuery = constructFindQuery(read, fiction, genre, year);
		console.log("Read : " + read + ", Fiction : " + fiction + ", Genre : " + genre + ", Year : " + year);
		let books = db.bookModel.find(findQuery, (err, books) => {
			if (err) {
				reject(err);
			} else {
				resolve(books);
			}
		});
	});
}

function constructFindQuery(read, fiction, genre, year) {
	let returnModel = {};
	if (fiction.toUpperCase() === "ALL") {
		if (year.toUpperCase() === "ANY" & genre.toUpperCase() === "ANY") {
			returnModel = {
				read: read
			}
		} else if (year.toUpperCase() === "ANY" & genre.toUpperCase() != "ANY") {
			returnModel = {
				read: read,
				genre: genre
			}
		} else if (year.toUpperCase() != "ANY" & genre.toUpperCase() === "ANY") {
			returnModel = {
				read: read,
				date: year
			}
		} else {
			returnModel = {
				read: read,
				genre: genre,
				date: year
			}
		}
	} else {
		if (year.toUpperCase() === "ANY" & genre.toUpperCase() === "ANY") {
			returnModel = {
				read: read,
				fiction: fiction
			}
		} else if (year.toUpperCase() === "ANY" & genre.toUpperCase() != "ANY") {
			returnModel = {
				read: read,
				fiction: fiction,
				genre: genre
			}
		} else if (year.toUpperCase() != "ANY" & genre.toUpperCase() === "ANY") {
			returnModel = {
				read: read,
				fiction: fiction,
				date: year
			}
		} else {
			returnModel = {
				read: read,
				fiction: fiction,
				genre: genre,
				date: year
			}
		}
	}
	return returnModel;
}




module.exports = {
	route,
	findUser,
	isPasswordValid,
	createNewUser,
	findById,
	addBookData,
	findBookData
}
