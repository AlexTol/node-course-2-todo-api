const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
    email:{
      type: String,
      required: true,
      minlength: 1,
      trim: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: '{VALUE} is not a valid email'
      }
    },
    password:{
        type: String,
        require: true,
        minLength: 6
    },
    tokens:[{
      access:{
        type:String,
        required:true
      },
      token:{
        type:String,
        required:true
      }
    }]

});


UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};


UserSchema.methods.generateAuthToken = function () {
  var user = this; //this is the 'user' document
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({access,token});//here we update the 'tokens' array of the 'user'
                                  //here we exploit es6 since the variables containing the updates
                                      // are named the same as the variables in the array

  return user.save().then(() => {
    return token;
  });

};

var User = mongoose.model('User',UserSchema);

module.exports = {User}
