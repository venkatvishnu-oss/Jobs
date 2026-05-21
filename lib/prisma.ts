import { PrismaClient } from '@prisma/client';

const globalWithPrisma = global as typeof globalThis & {
  prisma?: PrismaClient;
};

const prisma = globalWithPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV === 'development') globalWithPrisma.prisma = prisma;

export default prisma;
