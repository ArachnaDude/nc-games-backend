const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");

//supertest should always be brought in as "request"
const request = require("supertest");

//app should be brought in too, in order to be tested
const app = require("../app.js");

// seeds the database with test data before each test
// to make sure tests don't interfere with each other
beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/categories", () => {
  test("status: 200, responds with an array of categories", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then((result) => {
        expect(result.body.categories).toBeInstanceOf(Array);
        expect(result.body.categories).toHaveLength(4);
        result.body.categories.forEach((category) => {
          expect(category).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
  test("status: 405, responds with method not allowed when passed an invalid method", () => {
    return request(app)
      .delete("/api/categories")
      .expect(405)
      .then((result) => {
        expect(result.body.message).toBe("Method not allowed");
      });
  });
});
describe("GET /api/reviews/:review_id", () => {
  test("status: 200, responds with an object of the specfied review", () => {
    return request(app)
      .get("/api/reviews/2")
      .expect(200)
      .then((result) => {
        expect(result.body.review).toBeInstanceOf(Object);
        expect(result.body.review).toMatchObject({
          owner: expect.any(String),
          title: expect.any(String),
          review_id: 2,
          review_body: expect.any(String),
          designer: expect.any(String),
          review_img_url: expect.any(String),
          category: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          comment_count: "3",
        });
      });
  });
  test("status: 400, responds with bad request when passed a badly formed request", () => {
    return request(app)
      .get("/api/reviews/one")
      .expect(400)
      .then((result) => {
        expect(result.body.message).toBe("Bad request");
      });
  });
  test("status: 404, responds with not found when passed a valid but unused id", () => {
    return request(app)
      .get("/api/reviews/999")
      .expect(404)
      .then((result) => {
        expect(result.body.message).toBe("Review 999 not found");
      });
  });
});
describe("PATCH /api/reviews/:review_id", () => {
  test("status: 200, accepts an object updating votes with a positive integer, and returns updated review", () => {
    return request(app)
      .patch("/api/reviews/11")
      .send({ inc_votes: 1 })
      .expect(200)
      .then((result) => {
        expect(result.body.review.votes).toBe(9);
      });
  });
  test("status: 200, accepts an object updating votes with a negative integer, and returns updated review", () => {
    return request(app)
      .patch("/api/reviews/11")
      .send({ inc_votes: -2 })
      .expect(200)
      .then((result) => {
        expect(result.body.review.votes).toBe(6);
      });
  });
});
describe.only("GET /api/reviews", () => {
  test("status: 200, returns an array of review objects", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then((result) => {
        expect(result.body.reviews).toBeInstanceOf(Array);
        expect(result.body.reviews).toHaveLength(13);
        result.body.reviews.forEach((review) => {
          expect(review).toMatchObject({
            owner: expect.any(String),
            title: expect.any(String),
            review_id: expect.any(Number),
            category: expect.any(String),
            review_img_url: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            comment_count: expect.any(String),
          });
        });
      });
  });
  test("status: 200, array is sorted by created_at in descending order by default", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then((result) => {
        expect(result.body.reviews).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });
});
