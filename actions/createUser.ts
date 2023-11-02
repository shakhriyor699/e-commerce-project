'use server'
import prisma from "@/libs/prisma"
import { redirect } from 'next/navigation'



const createUser = async () => {
  const findUser = await prisma.user.findUnique({
    where: {
      name: 'Shakhriyor'
    }
  })

  

  if (findUser) {
    return findUser
  }
  const user = await prisma.user.create({
    data: {
      name: 'Shakhriyor',
      email: 'shakhriyor1156@gmail.com',
      hashedPassword: 'admin123',
      role: 'superadmin'
    }
  })
  // redirect('/login')
  return user
}

export default createUser