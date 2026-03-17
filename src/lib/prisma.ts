import { PrismaClient } from '@prisma/client';
import { createClient } from '@libsql/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const isLibsql = process.env.DATABASE_URL?.startsWith('libsql://');

let prismaClient: PrismaClient;

if (isLibsql) {
  const libsql = createClient({
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  });
  const adapter = new PrismaLibSql(libsql as any);
  prismaClient = new PrismaClient({ adapter });
} else {
  prismaClient = new PrismaClient({
    log: ['query'],
  });
}

export const prisma = globalForPrisma.prisma || prismaClient;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
