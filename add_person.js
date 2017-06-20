

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
console.log(query[0]);

function printOutput(err, rows) {
  if (err) console.log(err);
  console.log("Found " + rows.length + " person(s) by the name " + query[0]);
  for (let i = 0; i < rows.length; i++) {
  console.log("- " + i + ": " + rows[i].first_name + " " + rows[i].last_name + ", born " + rows[i].birthdate.toISOString().slice(0, 10));
  }
  knex.destroy();
};

// function runQuery(args, callback) {
//   knex.select().from('famous_people').where({
//     first_name: query[0],
//   }).orWhere({last_name: query[1]}).asCallback(printOutput);
// };

function addPerson(data) {
  knex.insert({
    first_name: data[0],
    last_name: data[1],
    birthdate: data[2]
  }).into('famous_people').asCallback(function() {
    knex.destroy()
  });
}

// console.log("Searching ...");
// runQuery(query, printOutput);
addPerson(query);
