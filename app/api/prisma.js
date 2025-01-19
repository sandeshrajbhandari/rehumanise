import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

// const prisma = globalForPrisma.prisma || new PrismaClient()

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

// export default prisma

const prisma = globalForPrisma.prisma || new PrismaClient();

async function clearPreparedStatements() {
  try {
    await prisma.$executeRawUnsafe("DEALLOCATE ALL");
    console.log("Cleared prepared statements.");
  } catch (error) {
    console.error("Error clearing prepared statements:", error);
  }
}

if (!globalForPrisma.prisma) {
  clearPreparedStatements();
}

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
