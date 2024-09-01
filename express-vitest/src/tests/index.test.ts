import { describe, expect, it, vi } from "vitest";
import request from "supertest";
import { app } from "../index";
import { utilFn } from "../utils/__mocks__";

import { dbClient } from "../__mocks__/db";
vi.mock("../db");
vi.mock("../utils");

describe("GET /", () => {
  it("Should return the server status", async () => {
    utilFn.mockImplementation(() => ({
      message: "This is mock data!",
    }));
    // utilFn.mockResolvedValue({
    //   message : "This is mock data!"
    // })
    const res = await request(app).get("/");

    expect(res.statusCode).toBe(200);
    expect(res.body.serverStatus).toBe("Server in running fine!");
    expect(res.body.message).toBe("This is mock data!");
  });
});

describe("POST /sum", () => {
  it("should return the sum of two numbers", async () => {
    // vi.spyOn(dbClient.result, "create");
    const res = await request(app).post("/sum").send({
      a: 1,
      b: 2,
    });

    expect(dbClient.result.create).toHaveBeenCalledWith({
      data: {
        a: 1,
        b: 2,
        result: 3,
      },
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(3);
  });

  it("should return the sum of two zero number", async () => {
    const res = await request(app).post("/sum").send({
      a: 0,
      b: 0,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(0);
  });
});

describe("POST /division", () => {
  it("should return the result to division of two numbers", async () => {
    dbClient.user.create.mockResolvedValue({
      id: 1,
      email: "adf",
      name: "fd",
    });

    const res = await request(app).post("/division").send({
      a: 5,
      b: 2,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toStrictEqual({
      result: {
        quotient: 2,
        remainder: 1,
        id: 1,
      },
    });
  });

  it("should return the result to division when we divide by 0", async () => {
    const res = await request(app).post("/division").send({
      a: 5,
      b: 0,
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toStrictEqual({ message: "Cannot divide by 0" });
  });
});
