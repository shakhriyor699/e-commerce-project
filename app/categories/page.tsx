import CategoriesForm from '@/components/Categories/CategoriesForm'
import React from 'react'

const CategoriesPage = () => {
  return (
    <>
      <h1>Categories</h1>
      <label htmlFor="New category name"></label>
      <CategoriesForm />
    </>
  )
}

export default CategoriesPage