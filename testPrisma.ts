import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function test() {
  try {
    // Test Prisma connection and basic operations
    const user = await prisma.user.create({
      data: {
        email: "test@example.com",
        hashedPassword: "hashedpassword",
      },
    });
    console.log('User created:', user);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

test();
