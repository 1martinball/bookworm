'use strict';
const h = require('../helpers');
const passport = require('passport');

module.exports = () => {

	let routes = {
		'get': {
			'/': (req, res, next) => {
				res.render('login', {
					page: "Login or Register"
				});
			},
			'/adduser': (req, res, next) => {
				res.render('adduser', {
					user: req.user,
					error: false,
					page: "Register new user"
				});
			},
			'/addbooks': (req, res, next) => {
				res.render('addbooks', {
					user: req.user,
					page: "Add Books",
					book: null
				});
			},
			'/findbooks': (req, res, next) => {
				let booksFound = false;
				h.findBookData(req).then(books => {
					if (books !== null && !books.isEmptyObject) {
						booksFound = true;
						console.log(books);
					}
					res.render('viewbooks', {
						user: req.user,
						page: "View book lists",
						books: books,
						booksFound: booksFound
					});
				})
				.catch(err => {
					console.log(err);
				})
			},
			'/viewbooks': (req, res, next) => {
				res.render('viewbooks', {
					user: req.user,
					booksFound: false,
					books: null,
					page: "View book lists"
				});
			},
			'/menu': (req, res, next) => {
				res.render('menu', {
					user: req.user,
					page: "Choose an option below"
				});
			}
		},
		'post': {
			'/adduser': (req, res, next) => {
				h.createNewUser(req).then(user => {
					console.log("Returned new user : " + user);
					res.render('login', {
						user: user,
						page: "User Added : Please Login"
					});
				})
				.catch(err => {
					console.log("That username is taken. Please try again");
					res.render('adduser', {
						page: "Duplicate User. Please try again",
						error: true
					});
				});
			},
			'/addbook': (req, res, next) => {
				h.addBookData(req).then(book => {
					console.log("Returned saved book : " + book);
					res.render('addbooks', {
						user: req.user,
						page: "Add Books",
						book: book
					});
				})
				.catch(err => {
					console.log(err);
				});
			}

		},
		'NA': (req, res, next) => {
			res.status(404).sendFile(process.cwd() + '/views/404.htm');
		}
	}

	return h.route(routes);

}
