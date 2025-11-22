const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(process.cwd(), 'vulnerable.db');

// Remove existing database
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
}

const db = new Database(dbPath);

// Create users table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    title TEXT NOT NULL,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER,
    user_id INTEGER,
    comment TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

// Insert sample data
const insertUser = db.prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)');
const insertPost = db.prepare('INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)');
const insertComment = db.prepare('INSERT INTO comments (post_id, user_id, comment) VALUES (?, ?, ?)');

insertUser.run('admin', 'admin@example.com', 'admin123');
insertUser.run('john_doe', 'john@example.com', 'password123');
insertUser.run('jane_smith', 'jane@example.com', 'qwerty');

const userId1 = insertUser.run('alice', 'alice@example.com', 'alice123').lastInsertRowid;
const userId2 = insertUser.run('bob', 'bob@example.com', 'bob456').lastInsertRowid;

insertPost.run(userId1, 'Welcome to the vulnerable app', 'This is a test post with some content.');
insertPost.run(userId2, 'SQL Injection Example', 'This post demonstrates SQL injection vulnerabilities.');

const postId1 = insertPost.run(userId1, 'DDoS Vulnerabilities', 'This post shows DDoS attack vectors.').lastInsertRowid;

insertComment.run(postId1, userId2, 'Great post!');
insertComment.run(postId1, userId1, 'Thanks for reading!');

console.log('Database initialized successfully!');
db.close();

