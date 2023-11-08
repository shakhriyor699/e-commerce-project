'use client'
import { useRouter } from "next/navigation"
import { FC } from "react"


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

  return (
    <>
      <h1>Вы точно хотите удалить данный товар?</h1>
      <button>Да</button>
      <button onClick={goBack}>Нет</button>
    </>
  )
}

export default DeleteIdPage