import prisma from "@/libs/prisma"


type UserData = {
  name: string
  email: string
  hashedPassword: string
}

const createUser = async (userData: UserData) => {
  const { name, email, hashedPassword } = userData
  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword
    }
  })

  return user
}

export default createUser