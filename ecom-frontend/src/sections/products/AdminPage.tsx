import { Box } from "@mui/material"
import AddCategory from "src/components/AddCategory"
import AddProduct from "src/components/AddProduct"

const AdminPage = () => {
  return (
    <Box mt={4}>
      <Box mt={2}>
        <AddProduct/>
      </Box>
      {/* <Box my={2}>
        <AddCategory/>
      </Box> */}
    </Box>
  )
}

export default AdminPage
