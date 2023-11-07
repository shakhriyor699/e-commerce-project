'use client'
import { SafeProduct } from "@/app/types";
import { yupResolver } from "@hookform/resolvers/yup"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup";

interface ProductEditProps {
  productById: SafeProduct | null
}

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required()
}).required();

const ProductEdit: FC<ProductEditProps> = ({ productById }) => {

  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, setValue, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: productById?.name || '',
      description: productById?.description || '',
      price: productById?.price || Number()
    }
  })

  console.log(productById);

  return (
    <>
      <form >
        <h1 className="text-blue-900 mb-2 text-xl">Edit product</h1>
        <label>Product name</label>
        <input {...register('name', { required: "Please enter product name" })} type="text" placeholder="product name" />
        <label>Product Description</label>
        <textarea {...register('description', { required: "Please enter your product description" })} placeholder="product description" />
        <label>Product price</label>
        <input  {...register('price', { required: "Please enter price" })} type="number" placeholder="price" />
        <button {...{ disabled: loading }} className="btn-primary">{loading ? 'loading...' : 'Edit'}</button>
      </form>
    </>
  )
}

export default ProductEdit