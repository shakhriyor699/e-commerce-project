import { getCurrentUser } from "@/actions/getCurrentUser"
import { NextResponse } from "next/server"
import prisma from "@/libs/prisma"


export const POST = async (req: Request) => {
  const currentUser = await getCurrentUser()



  if (!currentUser) {
    return NextResponse.error()
  }

  console.log(currentUser?.id);

  const body = await req.json()


  const {
    name,
    description,
    price
  } = body

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price,
      userId: currentUser.id
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