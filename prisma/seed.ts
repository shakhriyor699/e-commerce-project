import prisma from "@/libs/prisma";


const main = async () => {
  const user = await prisma.user.create({
    data: {
      name: 'Shakhriyor',
      email: 'shakhriyor1156@gmail.com',
      hashedPassword: 'admin123',
      role: 'superadmin'
    }
  })
}

main()
  .then(() => {
    console.log('User created')
  })
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
  
