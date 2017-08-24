const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//Todo.remove({}).then((result) => {
//  console.log(result);
//});

//Todo.findOneAndRemove
//Todo.findByIDAndRemove

Todo.findByIdAndRemove('599f50f9f18c87bb12bef2f9').then((todo) => {
  console.log(todo);
});
