/**
 * sample fetcher api class
 */

 var
   mongodb = require("mongodb").MongoClient,
   assert = require("assert"),
   cfg = require("./config"),
   q = require("q");

 function Eg() {
  var
    url = cfg.mongoUrl,
    _this = this;

  this._db = q.defer();
  this.collection = "shortform";

  mongodb.connect(url, function(err, db) {
    if (err) _this._db.reject(err);
    _this._db.resolve(db);
  });
 };

 Eg.prototype.db = function() {
  return this._db.promise;
 };

 Eg.prototype.close = function() {
  this.db().then(function(db){
    db.close();
  });
 };

 Eg.prototype.run = function(params) {
  var
  _this = this,
  done = q.defer();

  this.db().then(function(db) {
    var collection = db.collection(_this.collection);

    if (Object.keys(params).length) console.log("restricting by", params);

    collection.find(params || {}).toArray(function(err, docs) {
      done.resolve(docs);
    });
  },
  err => {
    done.reject(err);
  });

  return done.promise;
 };

 Eg.prototype.respondTo = function(res, params) {
  this.run(params).then(function(response) {
    res.send(response);
  });
 };

 module.exports = new Eg();
