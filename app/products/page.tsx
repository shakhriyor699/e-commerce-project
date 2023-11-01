import Link from 'next/link'
import React from 'react'

const ProductsPage = () => {
  return (
    <div>
      <Link className='bg-blue-900 text-white rounded-md py-1 px-2' href={"/products/new"}>
        Add new product
      </Link>
    </div>
  )
}

export default ProductsPage