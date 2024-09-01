import  {PrismaClient} from "@prisma/client";
import {mockDeep, mockReset} from "vitest-mock-extended"
import {vi} from "vitest"
import { request } from "express";

export const dbClient = mockDeep<PrismaClient>(); 

// export const dbClient = {
//         sum: { create: vi.fn() },
//         user: {
//           create: vi.fn(),
//           findMany: vi.fn(),
//           findUnique: vi.fn(),
//           update: vi.fn(),
//           delete: vi.fn(),
//         }
// }
