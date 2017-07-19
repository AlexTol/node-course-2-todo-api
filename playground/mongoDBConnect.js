//const MongoClient = require('mongodb').MongoClient;
//here we pullout MongoClient and ObjectID from the mongodb library
const {MongoClient, ObjectID} = require('mongodb');


//example of object destructuring
//create user object
var user = {name: 'Alex', age: 21};
//get 'name' field from user object
var {name} = user;
console.log(name);

//'connect' takes in the db url and a callback function
  //even if the database refered to doesn't exist, mongo db will create it automatically
    //as long as a record is inputted
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }

  console.log('Connected to MongoDB server')

/** example of insertion
  db.collection('Todos').insertOne({
    text: 'something to do',
    completed: false
  },    (err,result) => {

    if(err){
      return console.log('Unable to insert Todo',err);
    }

    //.ops stores all the documents we inserted
    console.log(JSON.stringify(result.ops,undefined,2));

  });
  */


  /**
  db.collection('Users').insertOne({
  //  _id: 1,//here I override  mongodb's default objectid
    Name: 'Alex Tol',
    age: 21,
    location: 'San Jose'

  },    (err,result) => {

    if(err){
      return console.log('Unable to insert User',err);
    }

    //.ops stores all the documents we inserted
    console.log(result.ops[0]._id.getTimestamp());

  });
  */

  db.close();
});
