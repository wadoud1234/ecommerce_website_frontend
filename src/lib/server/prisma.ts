import { PrismaClient } from "@prisma/client";

// const adapter = new PrismaLibSQL(libsql)

const prisma = new PrismaClient();
export default prisma;
