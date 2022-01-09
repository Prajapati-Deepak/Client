const express = require('express');
const cors = require("cors");
const fs =  require("fs");
const app = express();
const morgan = require("morgan");
const bodyparser = require("body-parser")
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {userSchema } = require("./Models")
require("dotenv").config();

// variables
const port = 5000



// Database connection
database_url = "mongodb+srv://marubozu:qwerty%40123@cluster0.2vl8j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(database_url)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    });


//auto load routes and middlewares
app.use(cors());
app.use(bodyparser.urlencoded());
app.use(bodyparser.json());
fs.readdirSync('./Routes').map((f)=> app.use('/', require(`./Routes/${f}`)))


// Local port connection
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})

