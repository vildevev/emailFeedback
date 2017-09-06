// use commonjs modules in the backend
const express = require('express'),
passport = require('passport'),
GoogleStrategy = require('passport-google-oauth20').Strategy,
keys = require('./config/keys');


const app = express();

// creates a new instance of the passport Google Strategy
passport.use(new GoogleStrategy({
	clientID: keys.googleClientID,
	clientSecret: keys.googleClientSecret,
	callbackURL: '/auth/google/callback'
		}, 
		(accessToken, refreshToken, profile, done) => {
		console.log('access token', accessToken);
		}
	)
);

app.get('/auth/google', passport.authenticate('google', {
	scope: ['profile', 'email']
	})
);

app.get('/auth/google/callback', passport.authenticate('google'));

// dynamic port binding for Heroku deployment
const PORT = process.env.PORT || 5000;
// instructs express to tell node to listen to port 5000
app.listen(PORT);