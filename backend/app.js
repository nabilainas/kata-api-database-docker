const express = require('express');
const cors = require('cors');
const app = express();
const { Pool } = require('pg');
app.use(cors());

const pool = new Pool({
  host: 'postgres',
  port: 5432,
  user: 'username',
  password: 'password',
  database: 'mydatabase'
});

pool.connect((err) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})
app.get('/users', (req, res) => {
  pool.query('SELECT * FROM users', (error, result) => {
    if (error) {
      throw error;
    }

    res.status(200).json(result.rows);
  });
});

module.exports = app
