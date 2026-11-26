import { PrismaClient } from "@prisma/client";

// One shared client per process (Prisma keeps its own connection pool).
export const prisma = new PrismaClient();

export async function checkDatabase(): Promise<void> {
  await prisma.$queryRaw`SELECT 1`;
}
