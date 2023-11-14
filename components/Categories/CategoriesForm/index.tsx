'use client'
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form"
import * as yup from 'yup'


const schema = yup.object().shape({
  name: yup.string().required(),
}).required();

const CategoriesForm = () => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: any) => {
    console.log(data)
    await axios.post('/api/categories', data)
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex gap-1 items-center'>
      <input {...register('name', { required: true })} className='mb-0' type="text" placeholder='Category name' />
      <button type='submit' className='btn-primary py-1'>Save</button>
    </form>
  )
}

export default CategoriesForm