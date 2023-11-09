'use client'

import { SafeProduct } from "@/app/types"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/navigation"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup";

interface ProductFormProps {
  productById?: SafeProduct | null
  onSubmit: (data: any) => void
  title: string
}

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required()
}).required();



const ProductsForm: FC<ProductFormProps> = ({ productById, onSubmit, title }) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: productById?.name || '',
      description: productById?.description || '',
      price: productById?.price || Number()
    }
  })


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-blue-900 mb-2 text-xl">{title} Товар</h1>
        <label>Product name</label>
        <input {...register('name', { required: "Please enter product name" })} type="text" placeholder="product name" />
        <div>
          <label>Product image</label>
        </div>
        <label>Product Description</label>
        <textarea {...register('description', { required: "Please enter your product description" })} placeholder="product description" />
        <label>Product price</label>
        <input  {...register('price', { required: "Please enter price" })} type="number" placeholder="price" />
        <button {...{ disabled: loading }} className="btn-primary">{loading ? 'loading...' : 'Edit'}</button>
      </form>
    </>
  )
}

export default ProductsForm