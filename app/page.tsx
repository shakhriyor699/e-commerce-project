'use client'

import Navbar from "@/components/Navbar"
import { signIn, useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()


  




  return (
    <div className="text-blue-900 flex justify-between">
      <h2> Hello, <b>{session?.user?.name}</b></h2>
      <div className="flex bg-gray-200 gap-1 text-black">
        {session && <Image fill src={`${session?.user?.image}`} alt="user" className="rounded-full" />}
        {session?.user?.name}
      </div>
    </div>
  )
}
