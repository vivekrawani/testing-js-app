import { describe, expect, it, vi } from 'vitest';
import request from "supertest";
import { app } from "../index"

/*
vi.mock("../db", () => ({
  dbClient: {
    sum: { create: vi.fn() },
    user: {
      create: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    }
  }
}))
*/
vi.mock("../db")

describe("GET /", () => {
  it("Should return the server status", async () => {
    const res = await request(app).get("/");

    expect(res.statusCode).toBe(200)
    expect(res.body).toBe("Server in running fine!")
  })
})


describe("POST /sum", () => {
  it("should return the sum of two numbers", async () => {
    const res = await request(app).post("/sum").send({
      a: 1,
      b: 2
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(3);
  });

  // failing this intentionally
  it("should return the sum of two zero number", async () => {
    const res = await request(app).post("/sum").send({
      a: 0,
      b: 0
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(0);
  });
});

describe("POST /division", () => {
  it("should return the result to division of two numbers", async () => {
    const res = await request(app).post("/division").send({
      a: 5,
      b: 2
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toStrictEqual({
      result: {
        quotient: 2, remainder: 1
      }
    });
  });


  it("should return the result to division when we divide by 0", async () => {
    const res = await request(app).post("/division").send({
      a: 5,
      b: 0
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toStrictEqual({ message: "Cannot divide by 0" });
  });
});

