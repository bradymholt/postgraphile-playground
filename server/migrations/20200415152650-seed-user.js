"use strict";

var dbm;
var type;
var seed;

exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.runSql(`\    
    SELECT register('john.doe@gmail.com', '123456!');
  `);
};

exports.down = function (db) {
  return null;
};

exports._meta = {
  version: 1,
};
