'use client'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import ProductsForm from '@/components/Products/ProductsForm';



const ProductsNewPage = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { reset } = useForm()


  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      const newData = {
        ...data,
        price: Number(data.price)
      }
      await axios.post('/api/products', newData)
      reset()
      toast.success('Товар успешно создан')
    } catch (error) {
      toast.error('Произошла ошибка при создании')
    }
    setLoading(false)
    router.push('/products')
    router.refresh()
  }


  return (
    <>
      <ProductsForm title='Добавить' />
    </>
  )
}

export default ProductsNewPage