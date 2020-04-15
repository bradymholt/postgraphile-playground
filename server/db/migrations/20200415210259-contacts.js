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
    CREATE TABLE contacts (
      id serial PRIMARY KEY,
      first_name VARCHAR,
      last_name VARCHAR,
      email_address VARCHAR,
      phone_number VARCHAR    
    );

    GRANT SELECT, INSERT, UPDATE, DELETE ON contacts TO ${process.env.POSTGRES_KNOWN_USER};
    GRANT SELECT, USAGE ON contacts_id_seq TO ${process.env.POSTGRES_KNOWN_USER};
  `);
};

exports.down = function (db) {
  return db.runSql(`DROP TABLE contacts;`);
};

exports._meta = {
  version: 1,
};
