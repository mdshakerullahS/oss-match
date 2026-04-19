import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const databaseURL = process.env.DATABASE_URL;

if (
  !databaseURL &&
  (!process.env.POSTGRES_USER ||
    !process.env.POSTGRES_PASSWORD ||
    !process.env.POSTGRES_HOST ||
    !process.env.POSTGRES_PORT ||
    !process.env.POSTGRES_DB)
) {
  throw new Error("Database configuration is missing");
}

const adapter = new PrismaPg({
  connectionString:
    databaseURL ??
    `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,
});

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
