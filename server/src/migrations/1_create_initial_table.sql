CREATE TABLE IF NOT EXISTS dna (id SERIAL PRIMARY KEY,dna_sequence VARCHAR(255) NOT NULL,created TIMESTAMP DEFAULT current_timestamp, UNIQUE(dna_sequence));
CREATE EXTENSION fuzzystrmatch;