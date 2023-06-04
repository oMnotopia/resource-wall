-- Drop and recreate resources table (Example)
DROP TABLE IF EXISTS resources CASCADE;

CREATE TABLE resources (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  likes INTEGER NOT NULL,
  rating FLOAT(2) NOT NULL,
  comments TEXT NOT NULL,
  category VARCHAR(255) NOT NULL
);
