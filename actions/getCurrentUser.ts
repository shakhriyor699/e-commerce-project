import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import prisma from "@/libs/prisma";

export const getSession = async () => {
  return await getServerSession(authOptions)
}


export const getCurrentUser = async () => {
  try {
    const session = await getSession();

   

    if (!session?.user?.email) {
      return null
    }

    const currentuser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string
      }
    })

    // if (!currentuser) return null

    return currentuser

  } catch (error) {
    return null
  }
}