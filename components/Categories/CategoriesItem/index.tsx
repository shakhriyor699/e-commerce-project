'use client'
import { Category } from '@prisma/client'
import { FC, useState } from 'react'
import CategoriesForm from '../CategoriesForm'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'
import Modal from '@/components/Modal';
import toast from 'react-hot-toast'




interface CategoriesItemProps {
  categories: Category[]
}

const CategoriesItem: FC<CategoriesItemProps> = ({ categories }) => {
  const [edit, setEdit] = useState({} as Category)
  const [editable, setEditable] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [deleteId, setDeleteId] = useState('')
  const [properties, setProperties] = useState<any[]>([])
  const router = useRouter()


  console.log(properties);
  
  const addProperties = () => {
    setProperties([...properties, { id: Date.now(), name: 's', value: 's' }])
  }


  const removeProperties = (index: number) => {
    // console.log(index);

    
    setProperties(properties.filter((_, i) => {
      console.log(i, index);
      return i !== index
    }))
  }


  const handleEdit = async (id: string) => {
    try {
      setEditable(true)
      const { data } = await axios.get(`/api/categories/${id}`)
      setEdit(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/categories/${id}`)
      toast.success('Категория удалена')
      router.refresh()
    } catch (error) {
      console.log(error)
      toast.error('Категория не удалена')
    }
    setShowModal(false)
  }

  const handleShowModal = (id: string) => {
    setShowModal(true)
    setDeleteId(id)
  }


  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <CategoriesForm removeProperties={removeProperties} properties={properties} setEditable={setEditable} editable={editable} edit={edit} />
      <button type='button' onClick={addProperties} className='btn-default text-sm mb-2 bg-gray-700'>Добавить характеристики</button>
      <table className='basic mt-5'>
        <thead>
          <tr>
            <td>Category Name</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {
            categories.length > 0 && categories.map(category => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>
                  <button onClick={() => handleEdit(category.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    EDIT
                  </button>
                  <button onClick={() => handleShowModal(category.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                    Delete
                  </button>
                </td>
              </tr>

            ))
          }
        </tbody>
      </table>
      {
        showModal && createPortal(
          <Modal close={handleCloseModal} deleteId={deleteId} onClick={handleDelete} categoryName={edit.name} />,
          document.body
        )
      }
    </>
  )
}

export default CategoriesItem