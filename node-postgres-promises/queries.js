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
  getAllUsers: getAllUsers
};

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
