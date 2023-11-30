'use client'
import { SafeProduct } from "@/app/types"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/navigation"
import { FC, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup";
import ImageUploading from 'react-images-uploading';
import axios from "axios"
import toast from "react-hot-toast"
import Image from "next/image"
import BeatLoader from "react-spinners/BeatLoader"
import { Category } from "@prisma/client"


interface ProductFormProps {
  productById?: SafeProduct | null
  categories?: Category[]
  edit?: boolean
  title: string
}

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  imageSrc: yup.array().required(),
  categoryId: yup.string().required(),
  properties: yup.array().of(yup.object().shape({
    value: yup.string().required()
  })).required()
}).required();



const ProductsForm: FC<ProductFormProps> = ({ productById, title, edit }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [upLoading, setUpLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [propertiesToFill, setPropertiesToFill] = useState<any[]>([])
  const { register, handleSubmit, reset, watch, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: productById?.name || '',
      description: productById?.description || '',
      price: productById?.price || Number(),
      imageSrc: productById?.imageSrc || [],
      categoryId: productById?.categoryId || ''
    }
  })
  const categoryId = watch('categoryId')

  const imageSrc = watch('imageSrc')

  console.log(imageSrc);

  useEffect(() => {
    const getPropertiesToEdit = async () => {
      const { data } = await axios.get(`/api/categories/${categoryId}`)
      setPropertiesToFill(data.properties)
    }
    if (edit) {
      getPropertiesToEdit()
    }
  }, [edit])

  // console.log(propertiesToFill);



  useEffect(() => {
    if (categories.length > 0 && categoryId) {
      const category = categories.find(item => item.id === categoryId)
      if (category) {
        setPropertiesToFill(category.properties)
      }
    }
  }, [categoryId])

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get('/api/categories')
      setCategories(data)
    }
    fetchCategories()
  }, [])


  const onChange = (imageList: any) => {
    console.log(imageList);

    setUpLoading(true)
    setValue('imageSrc', imageList);
    setUpLoading(false)
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
          categoryId: categoryId,
          price: Number(data.price),
          imageSrc: imageSrc.map((item: any) => {
            return item.dataURL
          }) || data.imageSrc.map((item: any) => {
            return item.dataURL
          }),

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
              <div className={`upload__image-wrapper flex items-center ${imageList.length > 0 && 'gap-4'}`}>
                <button
                  className="gap-2 h-32 border text-center flex items-center justify-center p-2 rounded-md bg-gray-200"
                  type="button"
                  style={isDragging ? { color: 'red' } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                  Click or Drop here
                </button>
                &nbsp;
                {imageList.length > 0 && <button type="button" onClick={onImageRemoveAll}>Remove all images</button>}
                {
                  upLoading ? (
                    <BeatLoader color="#36d7b7" />
                  ) : (
                    <div className="flex gap-7 -order-1">
                      {imageList.map((image, index) => (
                        <div key={index} className="image-item relative w-max p-5">
                          <Image src={`${image.dataURL ? image.dataURL : productById?.imageSrc}`} alt="" width={200} height={200} />
                          <div className="image-item__btn-wrapper">
                            <button type='button' onClick={() => onImageUpdate(index)}>Update</button>
                            <button className="absolute top-0 right-0" type='button' onClick={() => onImageRemove(index)}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                }

              </div>
            )}
          </ImageUploading>
        </div>
        <label>Product Description</label>
        <textarea {...register('description', { required: "Please enter your product description" })} placeholder="product description" />
        <label>Categories</label>
        <select className="mb-0"  {...register('categoryId')} name="categoryId"  >
          <option value="0">Uncategoryzed</option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option key={category.id} value={category.id} selected={category.id === categoryId}>
                {category.name}
              </option>
            ))}
        </select>
        {
          propertiesToFill.length > 0 && propertiesToFill.map((p, i) => (
            <div key={i} className="mb-2 mt-2 flex">
              <label className="mr-2">{p.name[0].toUpperCase() + p.name.slice(1)}</label>
              <div className="w-full ">
                <select {...register(`properties.${i}.value`)} >
                  {
                    p.value.split(',').map((v: string) => (
                      <option key={v} value={v} selected={categoryId === productById?.categoryId}>{v}</option>
                    ))
                  }
                </select>
              </div>
            </div>
          ))
        }
        <label>Product price</label>
        <input  {...register('price', { required: "Please enter price" })} type="number" placeholder="price" />
        <button {...{ disabled: loading }} className="btn-primary">{loading ? 'loading...' : edit ? 'Edit' : 'Create'}</button>
      </form>
    </>
  )
}

export default ProductsForm