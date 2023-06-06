-- Drop and recreate resources table (Example)
DROP TABLE IF EXISTS resources CASCADE;

CREATE TABLE resources (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(50) NOT NULL,
  url TEXT NOT NULL,
  img_url TEXT,
  description TEXT NOT NULL,
  category VARCHAR(255) NOT NULL
);
