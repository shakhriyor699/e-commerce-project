'use client'
import { SafeProduct } from "@/app/types"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/navigation"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup";
import ImageUploading from 'react-images-uploading';
import axios from "axios"
import toast from "react-hot-toast"
import Image from "next/image"

interface ProductFormProps {
  productById?: SafeProduct | null
  edit?: boolean
  title: string
}

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  imageSrc: yup.array().required()
}).required();



const ProductsForm: FC<ProductFormProps> = ({ productById, title, edit }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState([]);
  const { register, handleSubmit, reset, watch, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: productById?.name || '',
      description: productById?.description || '',
      price: productById?.price || Number(),
      imageSrc: productById?.imageSrc || []
    }
  })

  const imageSrc = watch('imageSrc')

  const onChange = (imageList: any) => {
    setValue('imageSrc', imageList);
  };


  const onSubmit = async (data: any) => {
    setLoading(true)
    if (!productById) {
      try {
        const newData = {
          ...data,
          price: Number(data.price),
          imageSrc: data.imageSrc.map((item: any) => {
            return item.dataURL
          })
        }

        await axios.post('/api/products', newData)
        reset()
        toast.success('Товар успешно создан')
      } catch (error) {
        toast.error('Произошла ошибка при создании')
      }
    }
    else {
      try {
        const newData = {
          ...data,
          price: Number(data.price),
          imageSrc: data.imageSrc.map((item: any) => {
            return item.dataURL
          })
        }
        await axios.patch(`/api/products/${productById?.id}`, newData)
        reset()
        toast.success('Товар успешно изменен')
      } catch (error) {
        toast.error('Произошла ошибка при изменении')
      }
    }
    setLoading(false)
    router.push('/products')
    router.refresh()
  }


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-blue-900 mb-2 text-xl">{title} Товар</h1>
        <label>Product name</label>
        <input {...register('name', { required: "Please enter product name" })} type="text" placeholder="product name" />
        <div>
          <label>Product image</label>
          <ImageUploading
            multiple
            value={imageSrc}
            onChange={onChange}
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div className="upload__image-wrapper">
                <button
                  type="button"
                  style={isDragging ? { color: 'red' } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Click or Drop here
                </button>
                &nbsp;
                <button onClick={onImageRemoveAll}>Remove all images</button>
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <Image src={`${image.dataURL}`} alt="" width={100} height={100} />
                    <div className="image-item__btn-wrapper">
                      <button onClick={() => onImageUpdate(index)}>Update</button>
                      <button onClick={() => onImageRemove(index)}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
        </div>
        <label>Product Description</label>
        <textarea {...register('description', { required: "Please enter your product description" })} placeholder="product description" />
        <label>Product price</label>
        <input  {...register('price', { required: "Please enter price" })} type="number" placeholder="price" />
        <button {...{ disabled: loading }} className="btn-primary">{loading ? 'loading...' : edit ? 'Edit' : 'Create'}</button>
      </form>
    </>
  )
}

export default ProductsForm