'use strict';

//social authentication logic
require('./auth')();

module.exports = {
	router: require('./router')(),
	session: require('./session')
}
