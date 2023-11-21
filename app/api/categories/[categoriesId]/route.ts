import { NextResponse } from "next/server"
import prisma from "@/libs/prisma"

export const GET = async (req: Request, { params }: { params: { categoriesId: string } }) => {
  try {
    const categories = await prisma.category.findUnique({
      where: {
        id: params.categoriesId
      }
    })
    return NextResponse.json(categories)
  } catch (error: any) {
    throw new Error(error)
  }
}


export const PATCH = async (req: Request, { params }: { params: { categoriesId: string } }) => {


  const body = await req.json()


  const {
    name
  } = body

  try {
    const category = await prisma.category.update({
      where: {
        id: params.categoriesId
      },
      data: {
        name
      }
    })
    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.error()
  }
}

export const DELETE = async (req: Request, { params }: { params: { categoriesId: string } }) => {
  try {
    const category = await prisma.category.delete({
      where: {
        id: params.categoriesId
      }
    })
    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.error()
  }
}