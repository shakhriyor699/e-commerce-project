import { SafeProduct } from "@/app/types";
import { FC } from "react"
import ProductsForm from "../ProductsForm";
import { Category } from "@prisma/client";
import { getCategories } from "@/actions/getCategories";

interface ProductEditProps {
  productById: SafeProduct | null
  // categories: Category[]
}


const ProductEdit: FC<ProductEditProps> = async ({ productById }) => {
  const categories = await getCategories()
  console.log(categories);
  
  return (
    <>
      <ProductsForm title='Изменить' productById={productById} edit categories={categories} />
    </>
  )
}

export default ProductEdit