import prisma from '@/libs/prisma'

export const getProductById = async (productId: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId
      }
    })

    if (!product) {
      return null
    }

    return {
      ...product,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString()
    }
  } catch (error: any) {
    throw new Error(error)
  }
}