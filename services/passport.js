const passport = require('passport'),
GoogleStrategy = require('passport-google-oauth20').Strategy,
mongoose = require('mongoose'),
User = mongoose.model('users'),
keys = require('../config/keys');

// creates a new instance of the passport Google Strategy
passport.use(new GoogleStrategy({
	clientID: keys.googleClientID,
	clientSecret: keys.googleClientSecret,
	callbackURL: '/auth/google/callback'
		}, 
		(accessToken, refreshToken, profile, done) => {
			new User({ googleId: profile.id }).save();
		}
	)
);
