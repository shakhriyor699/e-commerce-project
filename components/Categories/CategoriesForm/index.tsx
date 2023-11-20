'use client'
import { yupResolver } from "@hookform/resolvers/yup";
import { Category } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, FC } from "react";
import { useForm } from "react-hook-form"
import toast from "react-hot-toast";
import * as yup from 'yup'


const schema = yup.object().shape({
  name: yup.string().required(),
}).required();

interface CategoriesFormProps {
  categories: Category[]
  edit: Category
  editable?: boolean
  setEditable: (editable: boolean) => void
}

const CategoriesForm: FC<CategoriesFormProps> = ({ categories, edit, editable, setEditable }) => {
  const { register, handleSubmit, reset, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: edit?.name || "",
    }
  })
  const router = useRouter()

  console.log(editable);


  if (editable) {
    setValue('name', edit?.name)
  }


  const onSubmit = async (data: any) => {
    if (editable) {
      try {
        await axios.patch(`/api/categories/${edit.id}`, data)
        toast.success('Категория обновлена')
        router.refresh()
        reset()
        setEditable(false)
      } catch (error) {
        console.log(error)
      }
    }
    else {
      try {
        await axios.post('/api/categories', data)
        toast.success('Категория создана')
        reset()
        router.refresh()
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex gap-1 items-center'>
      <input {...register('name', { required: true })} className='mb-0' type="text" placeholder='Category name' />
      <button className='btn-primary py-1'>Save</button>
    </form>
  )
}

export default CategoriesForm