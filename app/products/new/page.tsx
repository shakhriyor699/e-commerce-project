'use client'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useRouter } from 'next/navigation';

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required()
}).required();

const ProductsNewPage = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { register, handleSubmit, setValue, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      price: Number()
    }
  })


  const onSubmit = async (data: any) => {
    setLoading(true)
    const newData = {
      ...data,
      price: Number(data.price)
    }
    await axios.post('/api/products', newData)
    setLoading(false)
    reset()
    router.push('/products')
    router.refresh()
  }


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-blue-900 mb-2 text-xl">Create new product</h1>
        <label>Product name</label>
        <input {...register('name', { required: "Please enter product name" })} type="text" placeholder="product name" />
        <label>Product Description</label>
        <textarea {...register('description', { required: "Please enter your product description" })} placeholder="product description" />
        <label>Product price</label>
        <input  {...register('price', { required: "Please enter price" })} type="number" placeholder="price" />
        <button {...{ disabled: loading }} className="btn-primary">{loading ? 'loading...' : 'Save'}</button>
      </form>
    </>
  )
}

export default ProductsNewPage