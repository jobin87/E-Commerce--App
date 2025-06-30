import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Card,
  Container,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { z as zod } from "zod";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "src/store";
import { productAdd } from "src/store/product/productThunk";
import toast from "react-hot-toast";

// Category options
const categoryOptions = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Books" },
  { id: 3, name: "Clothing" },
  { id: 4, name: "Home & Kitchen" },
  { id: 5, name: "Fitness" },
];

// Zod schema
const productSchema = zod.object({
  title: zod.string().min(1, { message: "Title is required" }),
  price: zod
    .number({ invalid_type_error: "Price must be a number" })
    .min(1, { message: "Price must be a positive number" }),
  description: zod.string().min(1, { message: "Description is required" }),
  categoryId: zod.coerce.number().min(1, { message: "Select a valid category" }),
});

type ProductFormType = zod.infer<typeof productSchema>;

const AddProduct = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductFormType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      categoryId: 1,
    },
  });

  const onSubmit = async (data: ProductFormType) => {
    try {
      await dispatch(productAdd({ ...data, images: [] }) as any);
      toast.success("Product added successfully!");
      reset();
    } catch (error) {
      toast.error("Failed to add product");
    }
  };

  return (
    <Container maxWidth="md" sx={{mt:8}}>
      <Card sx={{ p: 4, boxShadow: 2,mt:5 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Add New Product
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }} gap={3}>
            <TextField
              label="Product Title"
              {...register("title")}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <TextField
              label="Price"
              type="number"
              {...register("price", { valueAsNumber: true })}
              error={!!errors.price}
              helperText={errors.price?.message}
            />
            <TextField
              label="Description"
              multiline
              rows={3}
              {...register("description")}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
            <TextField
              select
              label="Category"
              {...register("categoryId")}
              error={!!errors.categoryId}
              helperText={errors.categoryId?.message}
            >
              {categoryOptions.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Stack alignItems="flex-end" sx={{ mt: 4 }}>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              Create Product
            </Button>
          </Stack>
        </form>
      </Card>
    </Container>
  );
};

export default AddProduct;
