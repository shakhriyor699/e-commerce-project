'use client'
import Navbar from "@/components/Navbar"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Home() {
  const {data: session, status} = useSession()
  const router = useRouter()

  console.log(session);


  if (status === 'unauthenticated') {
    return router.push('/login')
  }

  return (
    <div className="text-blue-900 flex justify-between">
      <h2> Hello, <b>{session?.user?.name}</b></h2>
      <div className="flex bg-gray-200 gap-1 text-black p-2 rounded-2xl">
        {session?.user?.image ? <Image width={24} height={24} src={`${session.user?.image}`} alt="user" className="rounded-full" /> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        }
        {session?.user?.name}
      </div>
    </div>
  )
}
