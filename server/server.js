var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req,res) => {
   var todo = new Todo({
     //when the information is posted, there will be a field called 'text'
        //which is in the class 'Todo'
        //that is in the body of the request (i.e the post)
     text: req.body.text
   });

   todo.save().then((doc) => {
     res.send(doc);
   }, (e) => {
     res.status(400).send(e);
   });

});

app.listen(3000, () => {
  console.log('started on port 3000');
});


module.exports = {app};






/*
//create new record
var newTodo = new Todo({
  text: 'cook dinner',
  completed: true,
  competedAt: 123
});
*/

/*
var newTodo = new Todo({
  text: 'program things',
});
*/

//save Todo
  /*
newTodo.save().then( (doc) => {
  console.log('saved todo',doc)
},
(e) => {
  console.log('Unable to save todo');
});
*/

/*
var newUser = new User({
  email: 'Steve@somemail.com'
});
*/

/*
newUser.save().then( (doc) => {
  console.log('saved todo',doc)
},
(e) => {
  console.log('Unable to save todo');
});
*/
