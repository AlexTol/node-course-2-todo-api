//const MongoClient = require('mongodb').MongoClient;
//here we pullout MongoClient and ObjectID from the mongodb library
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }

  console.log('Connected to MongoDB server');

  /** to delete multiple records
  db.collection('Todos').deleteMany({text: 'eat lunch'}).then((result) => {
    console.log(result);
  });
  */

  /** to delete one record
  db.collection('Todos').deleteOne({text: 'eat lunch'}).then((result) => {
    console.log(result);
  });
  */

  /*
  //deletes record and gives us it's info, kind of like pop on a stack
  db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    console.log(result);
  });
  */

  db.collection('Users').findOneAndDelete({_id : 12}).then((result) => {
    console.log(result);
  });

  //db.close();
});
