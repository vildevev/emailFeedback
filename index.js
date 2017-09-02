// use commonjs modules in the backend
const express = require('express'),
app = express();

// route handler: is watching for incoming HTTP requests with the 'get' method
// instructs express, people that are visiting the '/' route
// req = object representing the incoming request
// res = object representing the outgoing response 
app.get('/', (req, res) => {
	res.send({hi: 'there'});
});

// dynamic port binding for Heroku deployment
const PORT = process.env.PORT || 5000;
// instructs express to tell node to listen to port 5000
app.listen(PORT);