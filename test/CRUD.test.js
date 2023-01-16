const request = require('supertest');
import { TEST_API, mockUsers } from "./constants.ts";

let mockUserId;
const firstMockUser = mockUsers[0]
const secondMockUser = mockUsers[1]

describe("CRUD scenario 1", () => {
  test("It should respond with an array of users", async () => {
    const response = await request(TEST_API)
      .get("/users");

    expect(Array.isArray(response?.body)).toBe(true);
    expect(response?.statusCode).toBe(200);
  });

  test("It should create new user", async () => {
    const response = await request(TEST_API)
      .post("/users")
      .set("content-type", "application/json")
      .send(firstMockUser)

    expect(response?.body?.hasOwnProperty("id")).toBe(true);
    expect(typeof response?.body?.id).toBe('string');

    mockUserId = response?.body?.id //used as created at server-side id for next unit tests

    expect(response?.body?.hasOwnProperty("age")).toBe(true);
    expect(response?.body?.age).toEqual(firstMockUser.age);
    expect(response?.body?.hasOwnProperty("username")).toBe(true);
    expect(response?.body?.username).toEqual(firstMockUser.username);
    expect(response?.body?.hasOwnProperty("hobbies")).toBe(true);
    expect(Array.isArray(response?.body?.hobbies)).toBe(true);
    expect(response?.body?.hobbies).toEqual(firstMockUser.hobbies);
    expect(response?.statusCode).toBe(201);
  });

  test(`It should get user by id: `, async () => {
    const response = await request(TEST_API)
      .get("/users/" + mockUserId)

    expect(response?.body?.hasOwnProperty("id")).toBe(true);
    expect(typeof response?.body?.id).toBe('string');
    expect(response?.body?.hasOwnProperty("age")).toBe(true);
    expect(response?.body?.age).toEqual(firstMockUser.age);
    expect(response?.body?.hasOwnProperty("username")).toBe(true);
    expect(response?.body?.username).toEqual(firstMockUser.username);
    expect(response?.body?.hasOwnProperty("hobbies")).toBe(true);
    expect(Array.isArray(response?.body?.hobbies)).toBe(true);
    expect(response?.body?.hobbies).toEqual(firstMockUser.hobbies);
    expect(response?.statusCode).toBe(200);
  });

  test("It should update users age", async () => {
    const response = await request(TEST_API)
      .put("/users/" + mockUserId)
      .set("content-type", "application/json")
      .send({ ...firstMockUser, age: secondMockUser.age })

    expect(response?.body?.hasOwnProperty("id")).toBe(true);
    expect(typeof response?.body?.id).toBe('string');
    expect(response?.body?.id).toBe(mockUserId);
    expect(response?.body?.hasOwnProperty("age")).toBe(true);

    expect(response?.body?.age).toEqual(secondMockUser.age);

    expect(response?.body?.hasOwnProperty("username")).toBe(true);
    expect(response?.body?.username).toEqual(firstMockUser.username);
    expect(response?.body?.hasOwnProperty("hobbies")).toBe(true);
    expect(Array.isArray(response?.body?.hobbies)).toBe(true);
    expect(response?.body?.hobbies).toEqual(firstMockUser.hobbies);
    expect(response?.statusCode).toBe(200);
  });

  test(`It should delete user by id: `, async () => {
    const response = await request(TEST_API)
      .delete("/users/" + mockUserId)

    expect(response?.statusCode).toBe(204);
  });

  test(`It shouldn't get deleted user by id: `, async () => {
    const response = await request(TEST_API)
      .get("/users/" + mockUserId)

    expect(response?.statusCode).toBe(404);
  });
});

describe("CRUD scenario 2", () => {
  test("It should respond with an array of users", async () => {
    const response = await request(TEST_API)
      .get("/users");

    expect(Array.isArray(response?.body)).toBe(true);
    expect(response?.statusCode).toBe(200);
  });

  test("It shouldn't delete user by invalid id:", async () => {
    const response = await request(TEST_API)
      .delete("/users/" + "mockUserId")

    expect(response?.statusCode).toBe(400);
  });

  test("It should create new user", async () => {
    const response = await request(TEST_API)
      .post("/users")
      .set("content-type", "application/json")
      .send(firstMockUser)

    expect(response?.body?.hasOwnProperty("id")).toBe(true);
    expect(typeof response?.body?.id).toBe('string');

    mockUserId = response?.body?.id //used as created at server-side id for next unit tests

    expect(response?.body?.hasOwnProperty("age")).toBe(true);
    expect(response?.body?.age).toEqual(firstMockUser.age);
    expect(response?.body?.hasOwnProperty("username")).toBe(true);
    expect(response?.body?.username).toEqual(firstMockUser.username);
    expect(response?.body?.hasOwnProperty("hobbies")).toBe(true);
    expect(Array.isArray(response?.body?.hobbies)).toBe(true);
    expect(response?.body?.hobbies).toEqual(firstMockUser.hobbies);
    expect(response?.statusCode).toBe(201);
  });

  test("It should update users hobby", async () => {
    const response = await request(TEST_API)
      .put("/users/" + mockUserId)
      .set("content-type", "application/json")
      .send({ ...firstMockUser, hobbies: [...secondMockUser.hobbies] })

    expect(response?.body?.hasOwnProperty("id")).toBe(true);
    expect(typeof response?.body?.id).toBe('string');
    expect(response?.body?.id).toBe(mockUserId);
    expect(response?.body?.hasOwnProperty("age")).toBe(true);

    expect(response?.body?.age).toEqual(firstMockUser.age);

    expect(response?.body?.hasOwnProperty("username")).toBe(true);
    expect(response?.body?.username).toEqual(firstMockUser.username);
    expect(response?.body?.hasOwnProperty("hobbies")).toBe(true);
    expect(Array.isArray(response?.body?.hobbies)).toBe(true);
    expect(response?.body?.hobbies).toEqual(secondMockUser.hobbies);
    expect(response?.statusCode).toBe(200);
  });

  test(`It should get updated user by id: `, async () => {
    const response = await request(TEST_API)
      .get("/users/" + mockUserId)

    expect(response?.body?.hasOwnProperty("id")).toBe(true);
    expect(typeof response?.body?.id).toBe('string');
    expect(response?.body?.hasOwnProperty("age")).toBe(true);
    expect(response?.body?.age).toEqual(firstMockUser.age);
    expect(response?.body?.hasOwnProperty("username")).toBe(true);
    expect(response?.body?.username).toEqual(firstMockUser.username);
    expect(response?.body?.hasOwnProperty("hobbies")).toBe(true);
    expect(Array.isArray(response?.body?.hobbies)).toBe(true);
    expect(response?.body?.hobbies).toEqual(secondMockUser.hobbies);
    expect(response?.statusCode).toBe(200);
  });

  test(`It should delete user by id: `, async () => {
    const response = await request(TEST_API)
      .delete("/users/" + mockUserId)

    expect(response?.statusCode).toBe(204);
  });

  test(`It shouldn't get deleted user by id: `, async () => {
    const response = await request(TEST_API)
      .get("/users/" + mockUserId)

    expect(response?.statusCode).toBe(404);
  });
});

describe("CRUD scenario 3", () => {
  test("It should respond with an array of users", async () => {
    const response = await request(TEST_API)
      .get("/users");

    expect(Array.isArray(response?.body)).toBe(true);
    expect(response?.statusCode).toBe(200);
  });

  test("It shouldn't delete user by invalid id:", async () => {
    const response = await request(TEST_API)
      .delete("/users/" + undefined)

    expect(response?.statusCode).toBe(400);
  });

  test("It should create new user", async () => {
    const response = await request(TEST_API)
      .post("/users")
      .set("content-type", "application/json")
      .send(firstMockUser)

    expect(response?.body?.hasOwnProperty("id")).toBe(true);
    expect(typeof response?.body?.id).toBe('string');

    mockUserId = response?.body?.id //used as created at server-side id for next unit tests

    expect(response?.body?.hasOwnProperty("age")).toBe(true);
    expect(response?.body?.age).toEqual(firstMockUser.age);
    expect(response?.body?.hasOwnProperty("username")).toBe(true);
    expect(response?.body?.username).toEqual(firstMockUser.username);
    expect(response?.body?.hasOwnProperty("hobbies")).toBe(true);
    expect(Array.isArray(response?.body?.hobbies)).toBe(true);
    expect(response?.body?.hobbies).toEqual(firstMockUser.hobbies);
    expect(response?.statusCode).toBe(201);
  });

  test("It should update users username", async () => {
    const response = await request(TEST_API)
      .put("/users/" + mockUserId)
      .set("content-type", "application/json")
      .send({ ...firstMockUser, username: secondMockUser.username })

    expect(response?.body?.hasOwnProperty("id")).toBe(true);
    expect(typeof response?.body?.id).toBe('string');
    expect(response?.body?.id).toBe(mockUserId);
    expect(response?.body?.hasOwnProperty("age")).toBe(true);
    expect(response?.body?.age).toEqual(firstMockUser.age);
    expect(response?.body?.hasOwnProperty("username")).toBe(true);

    expect(response?.body?.username).toEqual(secondMockUser.username);
    
    expect(response?.body?.hasOwnProperty("hobbies")).toBe(true);
    expect(Array.isArray(response?.body?.hobbies)).toBe(true);
    expect(response?.body?.hobbies).toEqual(firstMockUser.hobbies);
    expect(response?.statusCode).toBe(200);
  });

  test(`It should get updated user by id: `, async () => {
    const response = await request(TEST_API)
      .get("/users/" + mockUserId)

    expect(response?.body?.hasOwnProperty("id")).toBe(true);
    expect(typeof response?.body?.id).toBe('string');
    expect(response?.body?.hasOwnProperty("age")).toBe(true);
    expect(response?.body?.age).toEqual(firstMockUser.age);
    expect(response?.body?.hasOwnProperty("username")).toBe(true);
    expect(response?.body?.username).toEqual(secondMockUser.username);
    expect(response?.body?.hasOwnProperty("hobbies")).toBe(true);
    expect(Array.isArray(response?.body?.hobbies)).toBe(true);
    expect(response?.body?.hobbies).toEqual(firstMockUser.hobbies);
    expect(response?.statusCode).toBe(200);
  });

  test(`It should delete user by id: `, async () => {
    const response = await request(TEST_API)
      .delete("/users/" + mockUserId)

    expect(response?.statusCode).toBe(204);
  });
  
  test(`It shouldn't get deleted user by id: `, async () => {
    const response = await request(TEST_API)
      .get("/users/" + mockUserId)

    expect(response?.statusCode).toBe(404);
  });

  test(`It should try to delete user by the same valid id: `, async () => {
    const response = await request(TEST_API)
      .delete("/users/" + mockUserId)

    expect(response?.statusCode).toBe(404);
  });

  test(`It shouldn't get deleted user by id: `, async () => {
    const response = await request(TEST_API)
      .get("/users/" + mockUserId)

    expect(response?.statusCode).toBe(404);
  });
});
