CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first VARCHAR(100) NOT NULL,     
    last VARCHAR(100) NOT NULL, 
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
);
