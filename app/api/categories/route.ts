import { getCurrentUser } from "@/actions/getCurrentUser"
import { NextResponse } from "next/server"
import prisma from "@/libs/prisma"


export const POST = async (req: Request) => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }


  try {
    const body = await req.json()
    const { name } = body

    console.log(body);
    
    const categories = await prisma.category.create({
      data: {
        name
      }
    })

    return NextResponse.json(categories)

  } catch (error) {
    return NextResponse.error()
  }


}