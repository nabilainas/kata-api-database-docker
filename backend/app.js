const express = require('express');
const app = express();
const { Pool } = require('pg');


const pool = new Pool({
  host: 'localhost',
  database: 'ma_base_de_donnees',
  password: 'password',
  port: 5432,
});

// Définition d'une route qui récupère les éléments de la base de données
app.get('/users', (req, res) => {
  pool.query('SELECT * FROM table', (error, result) => {
    if (error) {
      throw error;
    }

    res.status(200).json(result.rows);
  });
});

module.exports = app
