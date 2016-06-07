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
			'/addbook': (req, res, next) => {
				console.log("Hello in router");
				let book = h.addBookData(req)
					.catch(error => {
						book = error;
					});
				res.render('addbooks', {
					user: req.user,
					page: "Add Books",
					book: book
				});
				
			},
			'/findbooks': (req, res, next) => {
				let booksFound = false;
				let books = h.findBookData(req)
					.catch(error => {
						book = error;
					});
				if(books !== null && !books.isEmptyObject){
					booksFound = true;
				}
				res.render('viewbooks', {
					user: req.user,
					page: "View book lists",
					books: books,
					booksFound: booksFound
				});
				
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
			
		},
		'NA': (req, res, next) => {
			res.status(404).sendFile(process.cwd()+'/views/404.htm');
		}
	}

	return h.route(routes);

}



