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
  properties: yup.array().of(yup.object().shape({
    name: yup.string().required(),
    value: yup.string().required()
  }).required()).required()
}).required();


type Property = {
  id: number
  name: string
  value: string
}
interface CategoriesFormProps {
  edit: Category
  editable?: boolean
  setEditable: (editable: boolean) => void
  properties: Property[]
  removeProperties: (index: number) => void
  setProperties: (properties: Property[]) => void
}

const CategoriesForm: FC<CategoriesFormProps> = ({ edit, editable, setEditable, properties, removeProperties, setProperties }) => {
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
        setProperties([])
      } catch (error) {
        console.log(error)
      }
    }
  }



  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex gap-1 items-start flex-col'>
      <input {...register('name', { required: true })} className='mb-0' type="text" placeholder='Category name' />
      <div>
        {
          properties?.map((prop: any, i: number) => (
            <div className='mb-2 flex' key={prop.id}>
              <input
                type="text"
                placeholder="Property name"
                {...register(`properties.${i}.name`, { required: true })}
                className=' mr-2' />
              <input
                type="text"
                {...register(`properties.${i}.value`, { required: true })}
                placeholder="Property value"
                className='' />
              <button
                type='button'
                className='btn-primary text-sm '>
                Очистить
              </button>
              <button type='button' onClick={() => {
                removeProperties(prop.id)
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