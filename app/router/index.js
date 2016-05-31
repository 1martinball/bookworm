'use strict';
const h = require('../helpers');
const passport = require('passport');

module.exports = () => {

	let routes = {
		'get': {
			'/': (req, res, next) => {
				res.render('login');
			},
			'/rooms': (req, res, next) => {
				res.render('rooms', {
					user: req.user
				});
			},
			'/chat': (req, res, next) => {
				res.render('chatroom');
			},
			'/adduser': (req, res, next) => {
				res.render('adduser', {
					user: req.user
				});
			},
			'/addbooks': (req, res, next) => {
				res.render('chatroom');
			},
			'/viewbooks': (req, res, next) => {
				res.render('chatroom');
			},
			'/menu': (req, res, next) => {
				res.render('menu', {
					user: req.user
				});
			},
			'/auth/facebook': passport.authenticate('facebook'),
			'/auth/facebook/callback': passport.authenticate('facebook', {
				successRedirect: '/menu',
				failureRedirect:'/'
			})
		},
		'post': {

		},
		'NA': (req, res, next) => {
			res.status(404).sendFile(process.cwd()+'/views/404.htm');
		}
	}

	return h.route(routes);

}



