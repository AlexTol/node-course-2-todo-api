//const MongoClient = require('mongodb').MongoClient;
//here we pullout MongoClient and ObjectID from the mongodb library
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }

  console.log('Connected to MongoDB server');

/**
  //two method for then, the success case and failure case
    //an empty find returns all records
    //if I wanted to find a record with a certain ID I would do
      //find({new ObjectID('98162498vas69869a')}) this was an example ID
    //this returns all records that have 'false' under their completed field
  db.collection('Todos').find({completed: false}).count().then((countt) => { //the variable in the success function
    console.log('Todos count');                                               //holds whatever the previous calls returned
    console.log(JSON.stringify(countt,undefined,2));
  }, (err) => {
    console.log('Unable to fetch todos',err);
  });
*/

db.collection('Users').find({Name: 'Alex Tol'}).count().then((countt) => { //the variable in the success function
  console.log('Users retrieved');                                               //holds whatever the previous calls returned
  console.log(JSON.stringify(countt,undefined,2));
}, (err) => {
  console.log('Unable to fetch todos',err);
});

  //db.close();
});
