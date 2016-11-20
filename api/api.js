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

  mongodb.connect(url, function(err, db) {
    _this._db.resolve(db);
  });
 };

 Eg.prototype.db = function() {
  return this._db.promise;
 };

 Egs.prototype.close = function() {
  this.db().then(function(db){
    db.close();
  });
 };

 Egs.prototype.run = function(params) {
  var
  _this = this,
  done = q.defer();

  this.db().then(function(db) {
    var collection = db.collection("shortform");

    if (Object.keys(params).length) console.log("restricting by", params);

    collection.find(params || {}).toArray(function(err, docs) {
      done.resolve(docs);
      // _this.close();
    });
  });

  return done.promise;
 };

 Egs.prototype.respondTo = function(res, params) {
  this.run(params).then(function(response) {
    res.send(response);
  });
 };

 module.exports = new Egs();
