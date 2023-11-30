import { SafeProduct } from "@/app/types";
import { FC } from "react"
import ProductsForm from "../ProductsForm";
import { Category } from "@prisma/client";
import { getCategories } from "@/actions/getCategories";

interface ProductEditProps {
  productById: SafeProduct | null
}


const ProductEdit: FC<ProductEditProps> = async ({ productById }) => {
  const categories = await getCategories()
  
  return (
    <>
      <ProductsForm title='Изменить' productById={productById} edit categories={categories} />
    </>
  )
}

export default ProductEdit