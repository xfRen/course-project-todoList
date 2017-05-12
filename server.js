const express = require('express');
const path = require('path');

// create an app
const app = express();
// changes for HEROKU: PORT is added
const PORT = process.env.PORT || 3000;

app.use(function(request, response, next) {
	if (request.headers['x-forwarded-proto'] === 'https') { // when running on localhost, request.headers['x-forwarded-proto'] does NOT exist
		response.redirect('http://' + request.hostname + request.url);
	} else {
		next();
	}
});
app.use(express.static('public'));
// added below part to use browserHistory rather than hashHistory
app.get('*', function(request, response) {
	response.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
// -- end
app.listen(PORT, function() {
	console.log('This message is from server.js; Express server is up on port ' + PORT);
});
