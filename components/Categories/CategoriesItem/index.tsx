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
          <td>Category parent</td>
        </tr>
      </thead>
      <tbody>
        {
          categories.length > 0 && categories.map(category => (
            <tr key={category.id}>
              <td>{category.name}</td>
              {/* <td>{category?.parent }</td> */}
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default CategoriesItem