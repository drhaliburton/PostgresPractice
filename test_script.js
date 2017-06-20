const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

var query = process.argv.slice(2);

console.log(query);

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT $1::text AS first_name", ['first_name'], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(result); //output: 1
    client.end();
  });
});
