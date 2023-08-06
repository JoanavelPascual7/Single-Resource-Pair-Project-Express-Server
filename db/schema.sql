CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  director TEXT,
  genre TEXT,
  length TEXT,
  year INTEGER, 
  is_favorite BOOLEAN
);
