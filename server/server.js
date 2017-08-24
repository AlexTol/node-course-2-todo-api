var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

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

// GET /todos/1234324
app.get('/todos/:id',(req,res) => { //':id' makes an 'id' varible
  var id = req.params.id;

  if(!ObjectID.isValid(id))
  {
     return res.status(404).send();
  }


  Todo.findById(id).then( (todo) => {

    if(!todo)
    {
    return   res.status(404).send();
    }
    res.status(200).send({todo});

  }).catch((e) => {
    res.status(400).send();
  });
     //find by id
       //success
        //if todo, send it back
        //if no todo, send back 404 with empty body
      //error
        //400, send back empty object
})

app.listen(3000, () => {
  console.log('started on port 3000');
});

app.get('/todos', (req,res) => {
  Todo.find().then((todos) => {
    res.send({todos}) //we send an object just incase we want to add on other things than the todos array
  }, (e) => {
      res.status(400).send(e);
  })


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
