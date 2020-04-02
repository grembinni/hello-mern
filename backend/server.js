const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// config loader
require('dotenv').config();

// init app
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
// create user route
const userRouter = require('./routes/users');
app.use('/users', userRouter);
// create exercise route
const exerciseRouter = require('./routes/exercises');
app.use('/exercises', exerciseRouter);

// init mongodb connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
        console.log("mongodb connection established")
    }
);

app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});
