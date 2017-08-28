const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data1 = {
  id: 10
}
                    //Object,secret
var token1 = jwt.sign(data1,'123abc');      //takes in an object and signs it (creates the hash and returns token value)
                        //token, secret      secret must be valid
var decoded = jwt.verify(token1, '123abc')   //takesin the token and the secret and makes sure that the data was not manipulated
console.log(decoded);
/*
var message = 'I am user number 3';
var hash = SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`Hash: ${hash}`);

var data = {
  id:4
};

var token = {
  data,
  hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
}

//token.data.id = 5;
//token.hash = SHA256(JSON.stringify(token.data)).toString();

var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

if(resultHash === token.hash)
{
  console.log('Data was not changed');
}
else
{
  console.log('data was changed, do not trust')
}
*/
