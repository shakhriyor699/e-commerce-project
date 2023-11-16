import prisma from "@/libs/prisma"


export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany({

    })
    
    return categories
  } catch (error: any) {
    throw new Error(error)
  }
}