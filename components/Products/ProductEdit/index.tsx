import { SafeProduct } from "@/app/types";
import { FC } from "react"
import ProductsForm from "../ProductsForm";

interface ProductEditProps {
  productById: SafeProduct | null
}


const ProductEdit: FC<ProductEditProps> = ({ productById }) => {

  return (
    <>
      <ProductsForm title='Изменить' productById={productById} edit  />
    </>
  )
}

export default ProductEdit