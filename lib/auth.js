var express = require('express');

module.exports = express.basicAuth(function (user, pass, callback) {
	console.log(user == 'gober' && pass == 'pass');
	console.log(user == 'gober' );
	console.log(pass == 'pass' );
	if (user == 'gober' && pass == 'pass') {
		console.log('gober');
		var user;
		user.name = 'gober';
	} else {
		callback('invalid credentials');
	}
});