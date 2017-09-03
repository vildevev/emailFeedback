// use commonjs modules in the backend
const express = require('express'),
passport = require('passport'),
GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

// creates a new instance of the passport Google Strategy
passport.use(new GoogleStrategy());

// dynamic port binding for Heroku deployment
const PORT = process.env.PORT || 5000;
// instructs express to tell node to listen to port 5000
app.listen(PORT);