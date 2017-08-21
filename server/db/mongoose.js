const mongoose = require('mongoose');

//we tell mongoose we want to use the built in Promise library
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp',{useMongoClient: true});

module.exports = {mongoose};
