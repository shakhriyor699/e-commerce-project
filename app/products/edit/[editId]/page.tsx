import { getProductById } from "@/actions/getProductById"
import ProductEdit from "@/components/Products/ProductEdit"
import { FC } from "react"

interface EditIdPageProps {
  params: {
    editId: string
  }
}


const EditIdPage: FC<EditIdPageProps> = async ({ params }) => {
  const productById = await getProductById(params.editId)


  return (
    <div>
      edit product form here
      <ProductEdit productById={productById} />
    </div>
  )
}

export default EditIdPage