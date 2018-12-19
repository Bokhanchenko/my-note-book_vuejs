const pg = require('pg');
const env = require('./env');

const connectionString = `postgress://${env.db_username}:${env.db_password}@${env.db_host}:${env.db_port}/${env.db_name}`;

const db = new pg.Client(connectionString);

db.connect((err, client, done) => {
  if (err) {
    console.error('ERROR IN CONNECT TO DB', err)
  } else {
    console.log('Connect to DB')
  }
});

module.exports = db;
