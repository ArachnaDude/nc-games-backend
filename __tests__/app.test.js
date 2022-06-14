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
describe("GET /api/reviews", () => {
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
  test("status: 200, array is sorted by 'created_at' in descending order by default", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then((result) => {
        expect(result.body.reviews).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });
  test("status: 200, accepts query 'category' which filters reviews by category", () => {
    return request(app)
      .get("/api/reviews?category=euro%20game")
      .expect(200)
      .then((result) => {
        expect(result.body.reviews).toBeInstanceOf(Array);
        expect(result.body.reviews).toHaveLength(1);
        result.body.reviews.forEach((review) => {
          expect(review).toMatchObject({
            owner: expect.any(String),
            title: expect.any(String),
            review_id: expect.any(Number),
            category: "euro game",
            review_img_url: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            comment_count: expect.any(String),
          });
        });
      });
  });
  test("status: 200, returns an empty array when filtered by a valid category with no reviews", () => {
    return request(app)
      .get("/api/reviews?category=children%27s%20games")
      .expect(200)
      .then((result) => {
        expect(result.body.reviews).toBeInstanceOf(Array);
        expect(result.body.reviews).toHaveLength(0);
        expect(result.body.reviews).toEqual([]);
      });
  });
  test("status: 404, returns 'not found' when filtering by non-existent category", () => {
    return request(app)
      .get("/api/reviews?category=splango_glarb")
      .expect(404)
      .then((result) => {
        expect(result.body.message).toBe("category not found");
      });
  });
  test("status: 200, accepts query 'sort_by' which sorts by any valid column", () => {
    return request(app)
      .get("/api/reviews?sort_by=category")
      .expect(200)
      .then((result) => {
        expect(result.body.reviews).toBeSortedBy("category", {
          descending: true,
        });
      });
  });
  test("status: 400, returns 'bad request' if attempting to sort by an invalid column", () => {
    return request(app)
      .get("/api/reviews?sort_by=karma_chameleon")
      .expect(400)
      .then((result) => {
        expect(result.body.message).toBe("Bad request");
      });
  });
  test("status: 200, accepts query 'order' which specifies asc/desc", () => {
    return request(app)
      .get("/api/reviews?order=asc")
      .expect(200)
      .then((result) => {
        expect(result.body.reviews).toBeSortedBy("created_at", {
          descending: false,
        });
      });
  });
  test("status: 400, returns 'bad request' if attempting to order by an invalid direction", () => {
    return request(app)
      .get("/api/reviews?order=sideways")
      .expect(400)
      .then((result) => {
        expect(result.body.message).toBe("Bad request");
      });
  });
});
describe("GET /api/reviews/:review_id/comments", () => {
  test("status: 200, responds with an array of comment objects for a given review_id", () => {
    return request(app)
      .get("/api/reviews/3/comments")
      .expect(200)
      .then((result) => {
        expect(result.body.comments).toBeInstanceOf(Array);
        expect(result.body.comments).toHaveLength(3);
        result.body.comments.forEach((comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
          });
        });
      });
  });
  test("status: 200, array of comments is sorted by 'created_at' in descending order by default", () => {
    return request(app)
      .get("/api/reviews/3/comments")
      .expect(200)
      .then((result) => {
        expect(result.body.comments).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });
  test("status: 400, responds with 'bad request' if passed an invalid review_id", () => {
    return request(app)
      .get("/api/reviews/seven/comments")
      .expect(400)
      .then((result) => {
        expect(result.body.message).toBe("Bad request");
      });
  });
  test("status: 404, responds with 'not found' if passed a valid unused review_id", () => {
    return request(app)
      .get("/api/reviews/999/comments")
      .expect(404)
      .then((result) => {
        expect(result.body.message).toBe("Article not found");
      });
  });
  test("status: 200, responds with an empty array if passed a valid review_id with no comments", () => {
    return request(app)
      .get("/api/reviews/1/comments")
      .expect(200)
      .then((result) => {
        expect(result.body.comments).toBeInstanceOf(Array);
        expect(result.body.comments).toHaveLength(0);
        expect(result.body.comments).toEqual([]);
      });
  });
});
describe("POST /api/reviews/:review_id/comments", () => {
  test("status: 200, accepts a body and returns a comment object", () => {
    return request(app)
      .post("/api/reviews/1/comments")
      .send({ username: "dav3rid", body: "test_comment" })
      .expect(201)
      .then((result) => {
        expect(result.body.comment).toBeInstanceOf(Object);
        expect(result.body.comment).toMatchObject({
          comment_id: 7,
          votes: 0,
          created_at: expect.any(String),
          author: "dav3rid",
          body: "test_comment",
        });
      });
  });
  test("status: 400, returns 'bad request' if passed an invalid review_id", () => {
    return request(app)
      .post("/api/reviews/ducks/comments")
      .send({ username: "dav3rid", body: "comment goes here" })
      .expect(400)
      .then((result) => {
        expect(result.body.message).toBe("Bad request");
      });
  });
  test("status: 404, returns 'not found' if passed a valid unused review_id", () => {
    return request(app)
      .post("/api/reviews/9999/comments")
      .send({ username: "dav3rid", body: "I'm making a comment" })
      .expect(404)
      .then((result) => {
        expect(result.body.message).toBe("Not found");
      });
  });
  test("status: 400, returns 'bad request' when missing a required property", () => {
    return request(app)
      .post("/api/reviews/1/comments")
      .send({ username: "dav3rid" })
      .expect(400)
      .then((result) => {
        expect(result.body.message).toBe("Bad request");
      });
  });
  test("status: 404, returns 'not found' when username does not exist", () => {
    return request(app)
      .post("/api/reviews/1/comments")
      .send({ username: "barry_trotter", body: "this comment won't work" })
      .expect(404)
      .then((result) => {
        expect(result.body.message).toBe("Not found");
      });
  });
  test("status: 201, ignores extra properties on object", () => {
    return request(app)
      .post("/api/reviews/1/comments")
      .send({
        username: "dav3rid",
        body: "this comment will work",
        message: "this comment will be ignored",
      })
      .expect(201)
      .then((result) => {
        expect(result.body.comment).toMatchObject({
          comment_id: expect.any(Number),
          votes: 0,
          created_at: expect.any(String),
          author: "dav3rid",
          body: "this comment will work",
        });
      });
  });
});
describe.only("DELETE /api/comments/:comment_id", () => {
  test("status: 204, deletes comment, and returns nothing", () => {
    return request(app)
      .delete("/api/comments/1")
      .expect(204)
      .then(() => {
        return db
          .query(`SELECT * FROM comments WHERE comment_id = 1;`)
          .then((result) => {
            expect(result.rowCount).toBe(0);
          });
      });
  });
});
