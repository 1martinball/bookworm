'use strict';

const express = require('express');
const app = express();
const bookworm = require('./app');
const passport = require('passport');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(bookworm.session);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', bookworm.router);

app.listen(app.get('port'), () => {
	console.log('Bookworm running on port: ', 3000);
});
