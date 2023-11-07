import prisma from "@/libs/prisma"
import { getCurrentUser } from "./getCurrentUser"


export const getProducts = async () => {
  try {
    const currentUser = await getCurrentUser()
    const products = await prisma.product.findMany({
      where: {
        userId: currentUser?.id
      }
    })

    return products
  } catch (error: any) {
    throw new Error(error)
  }

}