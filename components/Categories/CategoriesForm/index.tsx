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
  properties: yup.array().required()
}).required();

interface CategoriesFormProps {
  edit: Category
  editable?: boolean
  setEditable: (editable: boolean) => void
  properties?: any
  removeProperties: (index: number) => void
}

const CategoriesForm: FC<CategoriesFormProps> = ({ edit, editable, setEditable, properties, removeProperties }) => {
  const { register, handleSubmit, reset, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: edit?.name || "",
      properties: properties || []
    }
  })
  const router = useRouter()




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

  const remove = (i: number) => {
    removeProperties(i)
    // console.log(i);

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex gap-1 items-start flex-col'>
      <input {...register('name', { required: true })} className='mb-0' type="text" placeholder='Category name' />
      <div>
        {
          properties.length > 0 && properties.map((prop: any, index: number) => (
            
            <div className='mb-2 flex' key={index}>
              {index}
              <input
                type="text"
                {...register(`properties.[${index}].name` as const)}
                placeholder="Property name"
                className=' mr-2' />
              <input
                type="text"
                {...register(`properties.[${index}].value` as const)}
                placeholder="Property value"
                className='' />
              <button
                type='button'
                onClick={() => {
                  setValue(`properties.[${index}].name`, '')
                  setValue(`properties.[${index}].value`, '')
                }}
                className='btn-primary text-sm '>
                Очистить
              </button>
              <button type='button' onClick={() => {
                remove(index)
              }} className="btn-default bg-red-500 text-white px-2">
                Удалить
              </button>
            </div>
          ))
        }
      </div>
      <button className='btn-primary py-1'>Save</button>
    </form>
  )
}

export default CategoriesForm