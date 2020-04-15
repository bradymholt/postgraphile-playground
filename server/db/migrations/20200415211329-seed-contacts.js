"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.runSql(`\  
    INSERT INTO contacts (first_name, last_name, email_address, phone_number)
    VALUES
      ('John', 'Doe', 'john.doe@gmail.com', '555-555-5555'),
      ('Susan', 'Willowman', 'susanw@yahoo.com', '343-245-2352'),
      ('Ralph', 'Sudoman', 'ralphyboy@comcast.net', '452-453-4563')
    ;     
  `);
};

exports.down = function (db) {
  return null;
};

exports._meta = {
  version: 1,
};
