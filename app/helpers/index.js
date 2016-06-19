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
			title: request.query.title,
			author: request.query.author,
			read: request.query.read,
			fiction: request.query.fiction,
			genre: request.query.genre,
			date: request.query.year
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

function constructFindQuery(read, fiction, genre, year){
	let returnModel = {};
	if(fiction.toUpperCase() === "ALL"){
		if(year.toUpperCase() === "ANY" & genre.toUpperCase() === "ANY"){
			returnModel = {
				read: read
			}
		} else if (year.toUpperCase() === "ANY" & genre.toUpperCase() != "ANY"){
			returnModel = {
				read: read,
				genre: genre
			}
		} else if (year.toUpperCase() != "ANY" & genre.toUpperCase() === "ANY"){
			returnModel = {
				read: read,
				date: year
			}
		}else {
			returnModel = {
				read: read,
				genre: genre,
				date: year
			}
		}
	} else {
		if(year.toUpperCase() === "ANY" & genre.toUpperCase() === "ANY"){
			returnModel = {
				read: read,
				fiction: fiction
			}
		} else if (year.toUpperCase() === "ANY" & genre.toUpperCase() != "ANY"){
			returnModel = {
				read: read,
				fiction: fiction,
				genre: genre
			}
		} else if (year.toUpperCase() != "ANY" & genre.toUpperCase() === "ANY"){
			returnModel = {
				read: read,
				fiction: fiction,
				date: year
			}
		}else {
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
	findOne,
	createNewUser,
	findById,
	addBookData,
	findBookData
}