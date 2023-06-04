-- Drop and recreate user_resources table (Example)
DROP TABLE IF EXISTS user_resources CASCADE;

CREATE TABLE user_resources (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    resource_id INTEGER REFERENCES resources(id) ON DELETE CASCADE
);
