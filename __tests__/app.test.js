const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const endpoints = require("../endpoints.json");

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
describe("DELETE /api/comments/:comment_id", () => {
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
  test("status: 400, responds with 'bad request' when passed an invalid id", () => {
    return request(app)
      .delete("/api/comments/q")
      .expect(400)
      .then((result) => {
        expect(result.body.message).toBe("Bad request");
      });
  });
  test("status: 404, responds with 'not found' when passed an unused valid id", () => {
    return request(app)
      .delete("/api/comments/99999")
      .expect(404)
      .then((result) => {
        expect(result.body.message).toBe("Not found");
      });
  });
});
describe("GET /api", () => {
  test("status: 200, responds with json describing all endpoints ", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((result) => {
        expect(result.body).toEqual(endpoints);
      });
  });
});
describe("404 Error /invalid_url", () => {
  test("status: 404, responds with 'not found' when passed an invalid route", () => {
    return request(app)
      .get("/api/not-a-route")
      .expect(404)
      .then((result) => {
        expect(result.body.message).toBe("URL not found");
      });
  });
});
describe("GET /api/users", () => {
  test("status: 200, responds with an array of users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((result) => {
        expect(result.body.users).toBeInstanceOf(Array);
        expect(result.body.users).toHaveLength(4);
        result.body.users.forEach((user) => {
          expect(user).toMatchObject({ username: expect.any(String) });
        });
      });
  });
});
describe("GET /api/users/:username", () => {
  test("status: 200, returns a user objects", () => {
    return request(app)
      .get("/api/users/dav3rid")
      .expect(200)
      .then((result) => {
        expect(result.body.user).toMatchObject({
          username: "dav3rid",
          avatar_url:
            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
          name: "dave",
        });
      });
  });
  test("status: 404, returns 'not found' if passed an invalid username", () => {
    return request(app)
      .get("/api/users/barry_the_trout")
      .expect(404)
      .then((result) => {
        expect(result.body.message).toBe("user not found");
      });
  });
});
describe("PATCH /api/comments/:comment_id", () => {
  test("status: 200, accepts an object to update comment vote property, returning the update comment", () => {
    return request(app)
      .patch("/api/comments/1")
      .send({ inc_votes: 1 })
      .expect(200)
      .then((result) => {
        expect(result.body.comment.votes).toBe(17);
      });
  });
  test("status: 400, responds with 'bad request' when passed invalid id", () => {
    return request(app)
      .patch("/api/comments/one")
      .send({ inc_votes: 1 })
      .expect(400)
      .then((result) => {
        expect(result.body.message).toBe("Bad request");
      });
  });
  test("status: 404, responds with 'bad request', when passed bad vote type", () => {
    return request(app)
      .patch("/api/comments/1")
      .send({ inc_votes: "one" })
      .expect(400)
      .then((result) => {
        expect(result.body.message).toBe("Bad request");
      });
  });
  test("status: 404, responds with not found when passed a valid unused comment_id", () => {
    return request(app)
      .patch("/api/comments/9999999")
      .send({ inc_votes: 1 })
      .expect(404)
      .then((result) => {
        expect(result.body.message).toBe("comment not found");
      });
  });
  test("status: 200, if missing correct key, there is no effect on votes", () => {
    return request(app)
      .patch("/api/comments/1")
      .send({ inky_boats: 1 })
      .expect(200)
      .then((result) => {
        expect(result.body.comment.votes).toBe(16);
      });
  });
});
describe("POST /api/reviews", () => {
  test("status: 201, accepts a body posting a review, responds with the posted reveiw.", () => {
    return request(app)
      .post("/api/reviews")
      .send({
        owner: "dav3rid",
        title: "snakes and ladders",
        review_body: "roll the dice, and make it to the end",
        designer: "Sir Humphrey Boardgame",
        category: "children's games",
      })
      .expect(201)
      .then((result) => {
        expect(result.body.review).toMatchObject({
          review_id: 14,
          votes: 0,
          created_at: expect.any(String),
          comment_count: 0,
          owner: "dav3rid",
          title: "snakes and ladders",
          review_body: "roll the dice, and make it to the end",
          designer: "Sir Humphrey Boardgame",
          category: "children's games",
        });
      });
  });
  test("status: 400, returns 'bad request' if missing a required key", () => {
    return request(app)
      .post("/api/reviews")
      .send({
        owner: "dav3rid",
        title: "snakes and ladders",
        designer: "Sir Humphrey Boardgame",
      })
      .expect(400)
      .then((result) => {
        expect(result.body.message).toBe("Bad request");
      });
  });
  test("status: 201, returns 'created' and ignores additional keys", () => {
    return request(app)
      .post("/api/reviews")
      .send({
        owner: "dav3rid",
        title: "Gloom",
        review_body: "Tell horrible stories",
        designer: "Keith Baker",
        category: "children's games",
        super_category: "Giga games",
        ignorable_key: "this does nothing",
      })
      .expect(201)
      .then((result) => {
        expect(result.body.review).toMatchObject({
          review_id: 14,
          votes: 0,
          created_at: expect.any(String),
          comment_count: 0,
          owner: "dav3rid",
          title: "Gloom",
          review_body: "Tell horrible stories",
          designer: "Keith Baker",
          category: "children's games",
        });
      });
  });
  test("status: 405, returns 'method not allowed' if sent a bad method", () => {
    return request(app)
      .patch("/api/reviews")
      .send({ dummy_key: "dummy value" })
      .expect(405)
      .then((result) => {
        expect(result.body.message).toBe("Method not allowed");
      });
  });
});
describe.only("POST /api/categories", () => {
  test("status: 201, responds with 'created' when passed a request body", () => {
    return request(app)
      .post("/api/categories")
      .send({ slug: "card game", description: "games involving cards" })
      .expect(201)
      .then((result) => {
        expect(result.body.category).toMatchObject({
          slug: "card game",
          description: "games involving cards",
        });
        return request(app);
      });
  });
});
