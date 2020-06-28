const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require("passport");
const cors = require('cors');
require('dotenv/config');

// Connect to db
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true  },
    ()=> console.log('Connection to MongoDB established ')
);

const app = express();

const users = require("./routes/api/users");



// Middleware
app.use(cors());
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);


// Import Routes
const exercisesRoute= require('./routes/exercises');
const workoutsRoute= require('./routes/workouts');
const profilesRoute= require('./routes/profiles');
const reportsRoute= require('./routes/reports');
const usersRoute= require('./routes/api/users');


app.use('/exercises', exercisesRoute);
app.use('/workouts', workoutsRoute);
app.use('/reports', reportsRoute);
app.use('/profiles', profilesRoute);
app.use('/api/users', usersRoute);

// Routes
app.get('/', (req,res)=>{
    res.send("Hello from Home") 
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);

console.log(`Server is running on port ${PORT}`);
