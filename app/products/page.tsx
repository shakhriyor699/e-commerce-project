import { getProducts } from '@/actions/getProducts'
import ProductsItems from '@/components/Products/ProductsItem'
import Link from 'next/link'




const ProductsPage = async () => {
  const products = await getProducts()


  return (
    <div>
      <Link className='bg-blue-900 text-white rounded-md py-1 px-2' href={"/products/new"}>
        Add new product
      </Link>
      <ProductsItems products={products} />
    </div>
  )
}

export default ProductsPage