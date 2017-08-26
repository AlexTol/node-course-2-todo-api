const mongoose = require('mongoose');

//we tell mongoose we want to use the built in Promise library
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI ,{useMongoClient: true});

module.exports = {mongoose};
