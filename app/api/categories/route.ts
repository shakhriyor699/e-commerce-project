import { getCurrentUser } from "@/actions/getCurrentUser"
import { NextResponse } from "next/server"
import prisma from "@/libs/prisma"


// export const POST = async (req: Request) => {
//   const currentUser = await getCurrentUser()

//   if (!currentUser) {
//     return NextResponse.error()
//   }


//   try {
//     const body = await req.json()
//     const { name } = body

//     const categories = await prisma.category.create({
//       data: {
//         name
//       }
//     })
//     return NextResponse.json(categories)
//   } catch (error) {
//     return NextResponse.error()
//   }
// }


export const POST = async (req: Request) => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const body = await req.json()

  const {
    name,
    properties
  } = body

  const category = await prisma.category.create({
    data: {
      name,
      properties
    }
  })
  return NextResponse.json(category)
}

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(categories)
  } catch (error: any) {
    throw new Error(error)
  }
}