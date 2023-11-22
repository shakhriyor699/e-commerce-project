import { FC } from 'react'

interface ModalProps {
  categoryName: string
  onClick: (id: string) => void
  deleteId: string
  close: () => void
}

const Modal: FC<ModalProps> = ({ categoryName, onClick, deleteId, close }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center absolute top-0 backdrop-blur">
      <div className="bg-black bg-opacity-20 p-5 rounded-lg flex flex-col items-center">
        <h2>Вы точно хотите удалить данную категорию {categoryName}</h2>
        <div className='text-lg font-bold'>
          <button className='text-red-500 mr-4' onClick={() => onClick(deleteId)}>Да</button>
          <button onClick={close}>Нет</button>
        </div>
      </div>
    </div>
  )
}
export default Modal