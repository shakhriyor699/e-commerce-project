import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function createAdminUser() {
  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@example.com',
      hashedPassword: 'admin123',
      role: 'admin',
    },
  });
}

createAdminUser()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });