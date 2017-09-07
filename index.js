// use commonjs modules in the backend
const express = require('express');
require('./services/passport');

const app = express();

// require function, call it with app as an argument
require('./routes/authRoutes')(app);
// dynamic port binding for Heroku deployment
const PORT = process.env.PORT || 5000;
// instructs express to tell node to listen to port 5000
app.listen(PORT);