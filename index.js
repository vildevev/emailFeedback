// use commonjs modules in the backend
const express = require('express'),
keys = require('./config/keys'),
cookieSession = require('cookie-session'),
passport = require('passport'),
mongoose = require('mongoose');
require('./models/user');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());

// require function, call it with app as an argument
require('./routes/authRoutes')(app);
// dynamic port binding for Heroku deployment
const PORT = process.env.PORT || 5000;
// instructs express to tell node to listen to port 5000
app.listen(PORT);