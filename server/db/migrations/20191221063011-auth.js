'use strict';

var dbm;
var type;
var seed;

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

// Note: We will not grant any privileges on users table to POSTGRESS_KNOWN_USER directly.
// Instead, we allow access through functions with SECURITY DEFINER specified. 
// This means the functions are executed with permissions of the function creator (superuser).

exports.up = function(db) {
  return db.runSql(`
CREATE TABLE users (
	id serial PRIMARY KEY,
	email VARCHAR UNIQUE NOT NULL,
	password_hash VARCHAR NOT NULL
);

CREATE TYPE jwt_token AS (
	ROLE text,
	exp integer,
	user_id integer,
	is_admin boolean,
	username varchar
);

CREATE OR REPLACE FUNCTION register (email text, password text)
	RETURNS int
	AS $$
DECLARE
	usr users;
BEGIN
	INSERT INTO users (email, password_hash)
		values(email, crypt(password, gen_salt('md5')))
	RETURNING
		* INTO usr;
	RETURN usr.id;
END;
$$
LANGUAGE plpgsql
STRICT
SECURITY DEFINER;

CREATE OR REPLACE FUNCTION authenticate (email text, password text)
	RETURNS jwt_token
	AS $$
DECLARE
	usr users;
BEGIN
	SELECT
		* INTO usr
	FROM
		users AS u
	WHERE
    u.email = authenticate.email
	LIMIT 1;

	IF usr.password_hash = crypt(password, password_hash) THEN
		RETURN (${process.env.POSTGRESS_KNOWN_USER},
			extract(epoch FROM now() + interval '7 days'),
			usr.id,
			FALSE,
			usr.email)::jwt_token;
	ELSE
		RETURN NULL;
	END IF;
END;
$$
LANGUAGE plpgsql
STRICT
SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_current_user ()
	RETURNS TABLE (
		email VARCHAR)
	AS $$
	BEGIN
	RETURN QUERY
	SELECT
		u.email
	FROM
		users AS u
	WHERE
		id = current_setting('jwt.claims.user_id', TRUE)::integer;
END; $$ 
 
LANGUAGE 'plpgsql'
STRICT
SECURITY DEFINER;
`);
};

exports.down = function(db) {
  return db.runSql(`
  DROP FUNCTION register(email text, password text);
  DROP FUNCTION authenticate (email text, password text);
  DROP FUNCTION get_current_user();
  DROP TABLE users;
  DROP TYPE jwt_token;
  `);
};

exports._meta = {
  "version": 1
};
