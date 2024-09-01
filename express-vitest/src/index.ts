import express, { Request, Response, NextFunction } from "express";
import fsPromise from "node:fs/promises";
import { z } from "zod";
import { dbClient } from "./db";
import { utilFn } from "./utils";
const app = express();
app.use(express.json());
app.use(logger);

const divisionBody = z.object({
  a: z.number(),
  b: z.number(),
});

app.post("/sum", async(req, res) => {
  const a = req.body.a;
  const b = req.body.b;
  const answer = a + b;

  const ret = await dbClient.result.create({
    data: {
      a: a,
      b: b,
      result: answer,
    },
  });

  res.json({
    answer,
  });
});

app.post("/division", async (req, res) => {
  const parsedBody = divisionBody.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(400).json({
      message: "Invalid input",
    });
  } else if (parsedBody.data.b === 0) {
    res.status(400).json({
      message: "Cannot divide by 0",
    });
  } else {
    const a = parsedBody.data.a;
    const b = parsedBody.data.b;
    const quotient = Math.floor(a / b);
    const remainder = 1 % b;

    const ret = await dbClient.user.create({
      data: {
        email: Math.random().toString(),
        name: "name",
      },
      select: {
        id: true,
      },
    });
    res.status(200).json({
      result: {
        quotient,
        remainder,
        id: ret.id,
      },
    });
  }
});

app.get("/", (req, res) => {
  const ret = utilFn();
  console.log(ret);
  res.json({ serverStatus: "Server in running fine!", message: ret.message });
});

async function logger(req: Request, res: Response, next: NextFunction) {
  // const url = new URL(req.url, `http://${req.headers.host}`);
  const ip = req.ip;
  const method = req.method;
  const date = new Date();
  // console.log("url", url)
  const log = `[${method}] \t${ip} at ${date}\n`;

  try {
    await fsPromise.appendFile("log.txt", log);
  } catch (err) {
    console.error(err);
  }
  // console.log(log)
  next();
}

export { app };
