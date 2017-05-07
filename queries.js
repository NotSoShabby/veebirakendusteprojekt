
var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgresql://postgres:areyouhere@localhost:5432/project';
var db = pgp(connectionString);

// add query functions

module.exports = {
  getUserInfo: getUserInfo,
  getAllUsers: getAllUsers,
  findUser: findUser
};

function findUser(email, password) {

console.log(email);
console.log(password);
  db.one('select * from userAuth where email = $1 and password =$2',[email, password])
    .then(function (data) {
      return true;
    })
    .catch(function (err) {
      return false;
    });
}


function getAllUsers(req, res, next) {
  db.any('select * from userinfo')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL users'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getUserInfo(req, res, next){
  var userEmail = req.mySession.username;
  console.log(userEmail);
  db.one('select * from userInfo where email = $1', userEmail)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE user'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
