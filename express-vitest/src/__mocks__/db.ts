import  {PrismaClient} from "@prisma/client";
import {mockDeep, mockReset} from "vitest-mock-extended"

export const dbClient = mockDeep<PrismaClient>();