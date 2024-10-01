const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const Prometheus = require('prom-client');

const app = express();
app.use(cors());
app.use(express.json());

// Configuration de la base de données PostgreSQL
const pool = new Pool({
  host: 'postgres', // Nom du service dans Docker Compose
  port: 5432,
  user: 'username',
  password: 'password',
  database: 'mydatabase',
});

// Configuration des métriques Prometheus
const register = new Prometheus.Registry();
Prometheus.collectDefaultMetrics({ register });

const httpRequestCounter = new Prometheus.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
});
register.registerMetric(httpRequestCounter);

const httpRequestDurationMicroseconds = new Prometheus.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500], // Buckets for response time
});

// Middleware pour mesurer le temps de réponse et les requêtes
app.use((req, res, next) => {
  res.locals.startEpoch = Date.now(); // Enregistrer l'heure de début
  next();
});

// Connexion à la base de données
pool.connect((err) => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('connected to database');
  }
});

// Endpoint pour les métriques Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Exemple d'endpoint pour obtenir un message
app.get('/', (req, res) => {
  setTimeout(() => {
    res.json({ message: 'Hello World!' });
  }, Math.round(Math.random() * 200));
});

// Endpoint pour obtenir tous les utilisateurs
app.get('/users', (req, res) => {
  pool.query('SELECT * FROM users', (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});

// Endpoint pour obtenir un utilisateur par ID
app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});

// Endpoint pour créer un nouvel utilisateur
app.post('/users', (req, res) => {
  const { first, last, email } = req.body;
  pool.query('INSERT INTO users (first, last, email) VALUES ($1, $2, $3) RETURNING *', [first, last, email], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(201).json(result.rows);
  });
});

// Endpoint pour mettre à jour un utilisateur
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

// Endpoint pour supprimer un utilisateur
app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  pool.query('DELETE FROM users WHERE id = $1', [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json({ message: 'User deleted' });
  });
});

// Middleware pour mesurer le temps de réponse
app.use((req, res, next) => {
  const responseTimeInMs = Date.now() - res.locals.startEpoch;
  httpRequestDurationMicroseconds.labels(req.method, req.route.path, res.statusCode).observe(responseTimeInMs);
  httpRequestCounter.labels(req.method, req.route.path, res.statusCode).inc(); // Increment counter
  next();
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

// Démarrage du serveur
const PORT = 80;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
