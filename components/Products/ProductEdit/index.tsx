'use client'
import { SafeProduct } from "@/app/types";
import { yupResolver } from "@hookform/resolvers/yup"
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast";
import * as yup from "yup";
import ProductsForm from "../ProductsForm";

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
  const router = useRouter()
  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: productById?.name || '',
      description: productById?.description || '',
      price: productById?.price || Number()
    }
  })



  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      const newData = {
        ...data,
        price: Number(data.price)
      }
      await axios.patch(`/api/products/${productById?.id}`, newData)
      reset()
      toast.success('Товар успешно изменен')
    } catch (error) {
      toast.error('Произошла ошибка при изменении')
    }
    setLoading(false)
    router.push('/products')
    router.refresh()
  }

  return (
    <>
      <ProductsForm title='Изменить' productById={productById} onSubmit={onSubmit} />
    </>
  )
}

export default ProductEdit