'use client'
import axios from "axios"
import { useRouter } from "next/navigation"
import { FC } from "react"
import toast from "react-hot-toast"


interface DeleteIdPageProps {
  params: {
    deleteId: string
  }
}

const DeleteIdPage: FC<DeleteIdPageProps> = ({ params: { deleteId } }) => {
  const router = useRouter()

  const goBack = () => {
    router.push('/products')
    router.refresh()
  }

  const onDelete = async () => {
    try {
      await axios.delete(`/api/products/${deleteId}`)
      toast.success('Товар успешно удален')
      goBack()
    } catch (error) {
      toast.error('Произошла ошибка при удалении')
    }
  }

  return (
    <>
      <h1>Вы точно хотите удалить данный товар?</h1>
      <button className="text-sm p-1 px-4 rounded-md inline-flex gap-1 mr-1 bg-blue-900 text-white" onClick={goBack}>Нет</button>
      <button className="text-sm p-1 px-4 rounded-md inline-flex gap-1 mr-1 bg-rose-700 text-white" onClick={onDelete}>Да</button>
    </>
  )
}

export default DeleteIdPage