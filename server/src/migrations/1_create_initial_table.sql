CREATE TABLE IF NOT EXISTS dna (id SERIAL PRIMARY KEY,dna_string VARCHAR(255) NOT NULL,created TIMESTAMP DEFAULT current_timestamp);
CREATE EXTENSION fuzzystrmatch;