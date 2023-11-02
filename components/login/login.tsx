'use client'
import { User } from "@prisma/client"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"



const Login = () => {
  const router = useRouter()
  const { register, handleSubmit } = useForm()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    signIn('credentials', {
      ...data,
      redirect: false
    })
    router.refresh()
  }

  return (
    <div className="w-[80%] max-w-[400px] mx-auto p-5  bg-white border-2 border-gray-50 rounded-md shadow-md">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-left font-bold" htmlFor="username">Username:</label>
          <input {...register('name')} className="w-full p-3 mt-1 mb-2 border-2 border-gray-100 rounded-md focus:outline-none" type="text" id="name" placeholder="Enter Username" required />
        </div>
      
        <div className="input-group">
         
          <label className="block text-left font-bold" htmlFor="password">Password:</label>
          <input {...register('hashedPassword')} className="w-full p-3 mt-1 mb-2 border-2 border-gray-100 rounded-md focus:outline-none" type="password" id="hashedPassword" placeholder="Enter Password" required />
        </div>
        <button className='bg-blue-400 text-white py-2 px-5 block mx-auto'>Login</button>
      </form>


      <span className="text-center block my-2">OR</span>
      <hr />
      <button onClick={() => signIn('google')} className="bg-blue-400 p-2 px-4 rounded-lg mt-2 text-white block mx-auto">Login with google</button>
      <span onClick={() => router.push('/register')} className="text-center block my-2 cursor-pointer">Create an account</span>
    </div>
  )
}

export default Login