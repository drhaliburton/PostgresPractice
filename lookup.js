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

var query = process.argv[2];

function printOutput(result) {
  console.log("Found " + result.rowCount + " person(s) by the name " + query);
  for (var i = 0; i < result.rowCount; i++) {
  console.log("- " + i + ": " + result.rows[i].first_name + " " + result.rows[i].last_name + ", born " + result.rows[i].birthdate.toISOString().slice(0, 10));
  }
};

function runQuery(args, callback) {
  client.query(`SELECT * FROM famous_people WHERE last_name = '${query}' OR first_name = '${query}'`, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    callback(result);
    client.end();
  });
};

client.connect((err) => {
  console.log("Searching ...");
  if (err) {
    return console.error("Connection Error", err);
  }
  runQuery(query, printOutput);
});
