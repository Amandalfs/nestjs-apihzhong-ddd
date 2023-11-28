import 'dotenv/config';
import { execSync } from 'child_process';
import { randomUUID } from 'crypto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function generateDatabaseUrl(schema: string) {
  if (!process.env.DATABASE_URL)
    throw new Error('Please environment DATABASE_URL');

  const dabatabaseUrl = new URL(process.env.DATABASE_URL);
  dabatabaseUrl.searchParams.set('schema', schema);
  process.env.DATABASE_URL = dabatabaseUrl.toString();
}

jest.setTimeout(20000);

const schema = randomUUID();

beforeAll(async () => {
  generateDatabaseUrl(schema);
  execSync('npx prisma migrate dev', {
    env: process.env,
  });
});

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
});
