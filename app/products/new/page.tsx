'use client'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const ProductsNewPage = () => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: '',
      description: '',
      price: 0
    }
  })
  const onSubmit = (data: any) => {
    console.log(data)
    axios.post('/api/products', data)
  }


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-blue-900 mb-2 text-xl">Create new product</h1>
        <label>Product name</label>
        <input {...register('name')} type="text" placeholder="product name" />
        <label>Product Description</label>
        <textarea {...register('description')} placeholder="product description"></textarea>
        <label>Product price</label>
        <input {...register('price')} type="number" placeholder="price" />
        <button className="btn-primary">Save</button>
      </form>
    </>
  )
}

export default ProductsNewPage