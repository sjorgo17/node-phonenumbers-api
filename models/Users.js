const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//embedding a one-to-many relationship

var Numbers = new Schema({
    type: { type: String, required: true, enum : ['Work','Personal']},
    phoneNumber: { type: String, required: true, match : /^[0-9*#+-]+$/i }
});

var Users = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    numbers: [Numbers]
});

module.exports = mongoose.model('Users', Users);