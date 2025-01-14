// lib/prisma.js
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global;

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Ensure the Prisma client is properly handling the connection lifecycle
if (process.env.NODE_ENV === "production") {
  prisma.$connect().catch((err) => {
    console.error("Failed to connect to the database", err);
  });
} else {
  prisma
    .$connect()
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((err) => {
      console.error("Failed to connect to the database", err);
    });
  process.on("exit", () => {
    prisma.$disconnect();
  });
}
