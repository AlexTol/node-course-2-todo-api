const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '599e3cdebbe42f411cf5ef18';
var idu = ObjectID("5973d20c8d4ae823dcf3b1c2");

if(!ObjectID.isValid(idu))
{
   console.log('ID not valid');
}

//grabs all docs with the same id, returns array
Todo.find({
  _id: id
}).then((todos) => {
  console.log('Todos', todos);
});

//grabs the first doc that matches the id, returns singular
Todo.findOne({
  _id: id
}).then((todo) => {
  console.log('Todo', todo);
});

Todo.findById(id).then((todo) => {
  if( !todo )
  {
    return console.log('Id not found');
  }
  console.log('Todo By Id', todo);
}).catch( (e) => console.log(e)); //the 'catch' catches any fromatting/type errors

User.findById(idu).then((user) => {
  if(!user)
  {
    return console.log('User not found');
  }
  console.log('User by Id', user);
}).catch( (e) => console.log(e));
