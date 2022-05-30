const db = require("../connection");
const format = require("pg-format");
const {
  formatCategoryData,
  formatUserData,
  formatReviewData,
  formatCommentData,
} = require("../utils");

const seed = async (data) => {
  const { categoryData, commentData, reviewData, userData } = data;
  // 1. drop tables if exist - delete in correct order
  await db.query(`DROP TABLE IF EXISTS comments;`);
  await db.query(`DROP TABLE IF EXISTS reviews;`);
  await db.query(`DROP TABLE IF EXISTS users;`);
  await db.query(`DROP TABLE IF EXISTS categories`);

  // 2. create tables in correct order - oppsite order to drop order
  await db.query(`CREATE TABLE categories (
    slug TEXT PRIMARY KEY,
    description TEXT DEFAULT 'no description available'
  );`);
  await db.query(`CREATE TABLE users (
    username TEXT PRIMARY KEY,
    avatar_url TEXT,
    name TEXT NOT NULL
  );`);
  await db.query(`CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    review_body TEXT NOT NULL,
    designer TEXT,
    review_img_url TEXT DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
    votes INT DEFAULT 0,
    category TEXT NOT NULL REFERENCES categories (slug),
    owner TEXT NOT NULL REFERENCES users (username),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`);
  await db.query(`CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    author TEXT NOT NULL REFERENCES users (username),
    review_id INT NOT NULL REFERENCES reviews (review_id),
    votes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    body TEXT NOT NULL
  );`);

  // 3. format data
  const categoryArray = formatCategoryData(categoryData);
  const userArray = formatUserData(userData);
  const reviewArray = formatReviewData(reviewData);
  const commentArray = formatCommentData(commentData);

  const categorySql = format(
    `INSERT INTO categories (slug, description) VALUES %L;`,
    categoryArray
  );
  const userSql = format(
    `INSERT INTO users (username, avatar_url, name) VALUES %L;`,
    userArray
  );
  const reviewSql = format(
    `INSERT INTO reviews (title, review_body, designer, review_img_url, votes, category, owner, created_at) VALUES %L;`,
    reviewArray
  );
  const commentSql = format(
    `INSERT INTO comments (author, review_id, votes, created_at, body) VALUES %L;`,
    commentArray
  );

  // 4. insert data
  await db.query(categorySql);
  await db.query(userSql);
  await db.query(reviewSql);
  await db.query(commentSql);
};

module.exports = seed;
