//const MongoClient = require('mongodb').MongoClient;
//here we pullout MongoClient and ObjectID from the mongodb library
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }

  console.log('Connected to MongoDB server');

  //note there are many update operators like $set for mongo
  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID('5970f6906b99ca92b649b85e')
  },    { $set:  {completed: true }  },
        {returnOriginal: false})
.then((result) => {
          console.log(result);
        });

db.collection('Users').findOneAndUpdate({
  _id: new ObjectID('596fc1810bbb4e1f38431e64')
},          {
             $set:    {Name: 'Alex'},
             $inc: {age: 1}
            },
           {returnOriginal: false})
.then((result) => {
      console.log(result);
            });


  //db.close();
});
