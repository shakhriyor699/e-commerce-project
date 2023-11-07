'use client'

import { Product } from "@prisma/client"
import Link from "next/link"
import { FC } from "react"

interface ProductsItemProps {
  products: Product[]
}

const ProductsItems: FC<ProductsItemProps> = ({ products }) => {




  return (
    <table className="basic mt-2">
      <thead>
        <tr>
          <td>Product Name</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {
          products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>
                <Link href={`/products/edit/${product.id}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                  EDIT
                </Link>
                <Link href={`/products/${product.id}`}>Delete</Link>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default ProductsItems


// import create from 'zustand'

// type State = {
//   loading: boolean
//   data: any
//   error: string | null
//   fetchData: () => Promise<void>
// }

// const useStore = create<State>((set) => ({
//   loading: false,
//   data: null,
//   error: null,
//   fetchData: async () => {
//     set({ loading: true })

//     try {
//       const response = await fetch('https://example.com/api/data')
//       const data = await response.json()
//       set({ data, error: null })
//     } catch (error) {
//       set({ error: 'An error occurred', data: null })
//     }

//     set({ loading: false })
//   },
// }))

// const MyComponent = () => {
//   const { loading, data, error, fetchData } = useStore()

//   useEffect(() => {
//     fetchData()
//   }, [])

//   if (loading) {
//     return <div>Loading...</div>
//   }

//   if (error) {
//     return <div>Error: {error}</div>
//   }

//   return <div>Data: {JSON.stringify(data)}</div>
// }