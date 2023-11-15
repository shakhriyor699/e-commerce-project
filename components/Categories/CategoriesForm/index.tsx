'use client'
import { yupResolver } from "@hookform/resolvers/yup";
import { Category } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form"
import toast from "react-hot-toast";
import * as yup from 'yup'


const schema = yup.object().shape({
  name: yup.string().required(),
  parentCategoryId: yup.number().required()
}).required();

interface CategoriesFormProps {
  categories: Category[]
}

const CategoriesForm: FC<CategoriesFormProps> = ({ categories }) => {
  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      parentCategoryId: 0
    }
  })
  const router = useRouter()

  const onSubmit = async (data: any) => {
    console.log(data);
    
    try {
      await axios.post('/api/categories', data)
      toast.success('Категория создана')
      reset()
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex gap-1 items-center'>
      <input {...register('name', { required: true })} className='mb-0' type="text" placeholder='Category name' />
      <select  className="mb-0">
        <option value="0">No parent category</option>
        {
          categories.length > 0 && categories.map(category => (
           <option {...register('parentCategoryId')} key={category.id} value={category.id}>{category.name}</option>
          ))
        }
      </select>
      <button className='btn-primary py-1'>Save</button>
    </form>
  )
}

export default CategoriesForm