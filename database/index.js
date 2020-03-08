require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPW,
  database: process.env.PGDB,
});

client.connect();

const get = (id, cb1, cb2) => {
  client.query('SELECT * FROM public.calendar WHERE exp_id = $1', [id], (err, res) => {
    if (err) {
      return cb1();
    }
    return cb2(res.rows[0]);
  });
};

module.exports.get = get;
