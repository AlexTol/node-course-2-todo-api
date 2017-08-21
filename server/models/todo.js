var mongoose = require('mongoose');

//how we create models, kind of like schemas
  //we define the fields and their types
var Todo = mongoose.model('Todo', {
  text:{
    type: String,
    required: true,
    minlength: 1,
    trim: true //removes leading or trailing whitespace
  },
  completed:{
    type:Boolean,
    default: false
  },
  completedAt:{
    type: Number,
    default: null
  }
});

module.exports = {Todo};
