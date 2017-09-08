const passport = require('passport'),
GoogleStrategy = require('passport-google-oauth20').Strategy,
mongoose = require('mongoose'),
User = mongoose.model('users'),
keys = require('../config/keys');


passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id)
		.then(user => {
			done(null, user);
		})
});

// creates a new instance of the passport Google Strategy
passport.use(new GoogleStrategy({
	clientID: keys.googleClientID,
	clientSecret: keys.googleClientSecret,
	callbackURL: '/auth/google/callback'
		}, 
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleId: profile.id })
				.then((existingUser) => {
					if (existingUser) {
						// first argument = error, second = object
						done(null, existingUser);
					} else {
						new User({ googleId: profile.id })
							.save()
							.then(user => done(null, user));
					}
				})
		}
	)
);
