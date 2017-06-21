

const settings = require("./settings");
const pg = require("pg");

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password: settings.password,
    database : settings.database,
    port: settings.port,
    ssl: settings.ssl
  }
});

const query = process.argv.slice(2);

function addPerson(data) {
  knex.insert({
    first_name: data[0],
    last_name: data[1],
    birthdate: data[2]
  }).into('famous_people').asCallback(function() {
    knex.destroy()
  });
}

addPerson(query);
