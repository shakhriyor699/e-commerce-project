import { getCurrentUser } from "@/actions/getCurrentUser"
import { NextResponse } from "next/server"
import prisma from "@/libs/prisma"


export const POST = async (req: Request) => {
  const currentUser = await getCurrentUser()



  if (!currentUser) {
    return NextResponse.error()
  }


  const body = await req.json()


  const {
    name,
    description,
    price,
    imageSrc,
    categoryId
  } = body

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price,
      imageSrc,
      userId: currentUser.id,
      categoryId: body.categoryId
    }
  })


  return NextResponse.json(product)
}

export const GET = async () => {
  const currentUser = await getCurrentUser()
  const products = await prisma.product.findMany({
    where: {
      userId: currentUser?.id
    }
  })
  return NextResponse.json(products)
}