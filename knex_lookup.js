const settings = require("./settings");
const pg = require("pg");

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password: settings.password,
    database : settings.database,
    port: settings.port
  }
});

const query = process.argv[2];

function printOutput(err, rows) {
  if (err) console.log(err);
  console.log("Found " + rows.length + " person(s) by the name " + query);
  for (let i = 0; i < rows.length; i++) {
  console.log("- " + i + ": " + rows[i].first_name + " " + rows[i].last_name + ", born " + rows[i].birthdate.toISOString().slice(0, 10));
  }
  knex.destroy();
};

function runQuery(args, callback) {
  knex.select().from('famous_people').where({
    first_name: query,
  }).orWhere({last_name: query}).asCallback(printOutput);

};

console.log("Searching ...");
runQuery(query, printOutput);
