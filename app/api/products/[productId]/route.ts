import { getCurrentUser } from "@/actions/getCurrentUser"
import prisma from "@/libs/prisma"
import { NextResponse } from "next/server"

export const PATCH = async (req: Request, { params }: { params: { productId: string } }) => {
  const currentUser = await getCurrentUser()
  const body = await req.json()

  if (!currentUser) {
    return NextResponse.error()
  }

  try {
    const {
      name,
      description,
      price,
      imageSrc
    } = body

    const product = await prisma.product.update({
      where: {
        id: params.productId
      },
      data: {
        name,
        description,
        price,
        imageSrc
      }
    })

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.error()
  }
}

export const DELETE = async (req: Request, { params }: { params: { productId: string } }) => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  try {
    const product = await prisma.product.delete({
      where: {
        id: params.productId
      }
    })

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.error()
  }

}