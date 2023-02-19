const express = require('express');
const cors = require('cors');
const app = express();
const { Pool } = require('pg');
app.use(cors());
app.use(express.json());

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

app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});


app.post('/users', (req, res) => {
  const { first, last, email } = req.body;
  pool.query('INSERT INTO users (first, last, email) VALUES ($1, $2, $3) RETURNING *', [first, last, email], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(201).json(result.rows);
  });
});

app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const { first, last, email } = req.body;
  pool.query('UPDATE users SET first = CASE WHEN $1 <> first THEN $1 ELSE first END, last = CASE WHEN $2 <> last THEN $2 ELSE last END, email = CASE WHEN $3 <> email THEN $3 ELSE email END WHERE id = $4 RETURNING *', [first, last, email, id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
})
app.delete('/users', (req, res) => {
  const id = req.params.id;
  pool.query('DELETE FROM users WHERE id = $1', [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json({ message: 'deleted' });
  });
  
})



module.exports = app
