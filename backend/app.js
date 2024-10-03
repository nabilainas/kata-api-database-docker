const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const dbUrl = process.env.DATABASE_URL 

const { Pool } = require('pg');
const pool = new Pool({
  host: dbUrl,
  port: 5432,
  user: 'username',
  password: 'password',
  database: 'mydatabase',
});

pool.connect((err) => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('connected to database');
  }
});


const client = require('prom-client');
const register = new client.Registry()
register.setDefaultLabels({
  app: 'webapp'
})
client.collectDefaultMetrics({ register })

app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType)
    res.end(await register.metrics())
  } catch (ex) {
    res.status(500).end(ex)
  }
})


app.get('/', (req, res) => {
  console.log(`URL : ${dbUrl}`);
  setTimeout(() => {
    res.json({ message: 'Hello World!' });
  }, Math.round(Math.random() * 200));
});

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
  pool.query('UPDATE users SET first = $1, last = $2, email = $3 WHERE id = $4 RETURNING *', [first, last, email, id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});

app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  pool.query('DELETE FROM users WHERE id = $1', [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json({ message: 'User deleted' });
  });
});

module.exports = app;