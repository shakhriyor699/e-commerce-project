import ProductEdit from "@/components/Products/ProductEdit"
import { FC } from "react"

interface EditIdPageProps {
  params: {
    editId: string
  }
}


const EditIdPage: FC<EditIdPageProps> = ({ params }) => {
  const { editId } = params



  return (
    <div>
      edit product form here
      <ProductEdit editId={editId} />
    </div>
  )
}

export default EditIdPage