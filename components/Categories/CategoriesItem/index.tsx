'use client'
import { Category } from '@prisma/client'
import { FC } from 'react'



interface CategoriesItemProps {
  categories: Category[]
}

const CategoriesItem: FC<CategoriesItemProps> = ({ categories }) => {

  
  return (
    <table className='basic mt-5'>
      <thead>
        <tr>
          <td>Category Name</td>
        </tr>
      </thead>
      <tbody>
        {
          categories.length > 0 && categories.map(category => (
            <tr key={category.id}>
              <td>{category.name}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default CategoriesItem