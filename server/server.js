require('./config/config');


const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT || 3000;

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

})

app.delete('/todos/:id', (req,res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id))
  {
     return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {

    if(!todo)
    {
      return res.status(404).send();
    }

    res.status(200).send({todo});

  }).catch((e) => {
    res.status(400).send();
  });

});


app.patch('/todos/:id', (req,res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text','completed']);//we use the 'pick' method, to limit what users can update

  if(!ObjectID.isValid(id))
  {
     return res.status(404).send();
  }


  if (_.isBoolean(body.completed) && body.completed)
    {
      body.completedAt = new Date().getTime();
    }
  else
    {
      body.completed = false
      body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id,{$set: body},{new: true})
    .then((todo) => {
        if(!todo)
          {
            return res.status(404).send();
          }

          res.send({todo});
    }).catch((e) => {
      res.status(400).send();
    });

});

//POST /users
  //use pick

app.post('/users', (req, res) => {
  var body = _.pick(req.body,['email', 'password']);
  var user = new User(body);



  user.save().then( (user) =>{
    return user.generateAuthToken();
    //res.status(200).send(user);
  }).then((token) => {
    res.header('x-auth', token).status(200).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });

});


//this route uses the middleware in authenticate.js
app.get('/users/me', authenticate, (req,res) => {
  res.send(req.user);
});

app.listen(port, () => {
  console.log(`started on port ${port}`);
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
