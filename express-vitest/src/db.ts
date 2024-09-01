import { PrismaClient } from "@prisma/client";

export const dbClient =  new PrismaClient();

// export const mockDb = {
//     sum : {
//         create : ()=>{

//         }
//     }
// }

// export default dbClient;