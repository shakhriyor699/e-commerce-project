import { getCategories } from '@/actions/getCategories'
import CategoriesItem from '@/components/Categories/CategoriesItem'
import React from 'react'

const CategoriesPage = async () => {
  const categories = await getCategories()

  return (
    <>
      <h1>Categories</h1>
      <label>New category name</label>
      
      <CategoriesItem categories={categories} />
    </>
  )
}

export default CategoriesPage