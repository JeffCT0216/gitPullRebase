const pg = require('pg');
const dbPassword = require("./config").dbPassword;

const connection =
  process.env.DATABASE_URL || `postgres://postgres:${dbPassword}@localhost:5432/artists`;

const knex = require('knex')({
  client: 'pg',
  connection,
});

const bookshelf = require('bookshelf')(knex);

const User = bookshelf.Model.extend({
  tableName: 'users',
});

const Artist = bookshelf.Model.extend({
  tableName: 'artist',
});

const Date = bookshelf.Model.extend({
  tableName: 'date',
});

const Artist_Availability = bookshelf.Model.extend({
  tableName: 'artist_availability',
});

const Requested_Gigs = bookshelf.Model.extend({
  tableName: 'requested_gigs',
});

const Single = bookshelf.Model.extend({
  tableName: 'single',
});

const Artist_Genre = bookshelf.Model.extend({
  tableName: 'artist_genre',
});

const Booking_Date = bookshelf.Model.extend({
  tableName: 'booking_date',
});

module.exports.knex = knex;
module.exports.Artist = Artist;
module.exports.Artist_Genre = Artist_Genre;
module.exports.Date = Date;
module.exports.Artist_Availability = Artist_Availability;
module.exports.Requested_Gigs = Requested_Gigs;
module.exports.Single = Single;
module.exports.User = User;
module.exports.Booking_Date = Booking_Date;

/*
	TO CONNECT VIA TERMINAL (password might be different for each user)

	psql -U postgres   (case sensitive)

	\l                  shows list of databases
	\c [database]       to switch databases
	\dt                 shows list of tables for database

	\q                  to exist postgres terminal


	TO EXECUTE A FILE WITH QUERIES TO CREATE DATABASE AND TABLES

	psql -U postgres -f [filename]

	For ours:
	psql -U postgres -f schema.sql

*/
