import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


const main = async () => {
  try {
    await prisma.user.create({
      data: {
        name: 'Shakhriyor',
        email: 'shakhriyor1156@gmail.com',
        hashedPassword: 'admin123',
        role: 'superadmin'
      }
    })
  } catch (error) {

  } finally {
    await prisma.$disconnect()
  }
}

main()


