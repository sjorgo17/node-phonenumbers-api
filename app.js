const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var mongoose = require('mongoose');
const usersRoutes = require('./routes/users');
const app = express();
  
var corsOptions = {
  origin: "http://localhost:5000"
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


const port = 5000;
app.use('/',usersRoutes);


var mongoDB = 'mongodb+srv://sjorgo:testmongo@phonebook.o6rcn.mongodb.net/phonebook_db?retryWrites=true&w=majority'; 
mongoose.connect(mongoDB,{useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error',console.error.bind(console, 'MongoDB connection error:'));


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})