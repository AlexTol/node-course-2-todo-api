var {User} = require('./../models/user');

//middleware
var authenticate = (req,res,next) => {
  var token = req.header('x-auth');

  User.findByToken(token).then((user) => {
      if(!user)
      {
        return Promise.reject(); //automatically goes to the catch
      }

      req.user = user;
      req.token = token;
      next(); //this is so that the /users/me route runs
  }).catch( (e) => {
    res.status(401).send();
  });
};

module.exports = {authenticate};
