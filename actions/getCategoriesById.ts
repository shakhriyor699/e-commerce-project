import prisma from "@/libs/prisma"

export const getCategoriesById = async (id: string) => {
  try {
    const categories = await prisma.category.findUnique({
      where: {
        id
      }
    })
    return categories
  }
  catch (error: any) {
    throw new Error(error)
  }
}