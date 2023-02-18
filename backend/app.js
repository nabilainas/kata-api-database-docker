const express = require('express');
const app = express();
const { Pool } = require('pg');


const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'username',
  password: 'password',
});

pool.connect((err) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})
// app.get('/users', (req, res) => {
//   pool.query('SELECT * FROM table', (error, result) => {
//     if (error) {
//       throw error;
//     }

//     res.status(200).json(result.rows);
//   });
// });

module.exports = app
