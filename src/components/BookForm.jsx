// import { useForm } from "react-hook-form";
// import { addBook, updateBook } from "../api/bookService";
// import { toast } from "react-toastify";

// function BookForm({ book, onClose }) {
//   const { register, handleSubmit, setValue, formState: { errors } } = useForm({
//     defaultValues: book || {}
//   });

//   const onSubmit = async (data) => {
//     try {
//       if (book) {
//         await updateBook(book.id, data);
//         toast.success("Book updated");
//       } else {
//         await addBook(data);
//         toast.success("Book added");
//       }
//       onClose();
//     } catch (error) {
//       toast.error("Failed to save book");
//     }
//   };

//   return (
//     <div style={{ background: 'white', padding: '20px', border: '1px solid #ccc' }}>
//       <h2>{book ? "Edit Book" : "Add Book"}</h2>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div>
//           <label>Title</label>
//           <input {...register('title', { required: "Title is required" })} />
//           {errors.title && <p>{errors.title.message}</p>}
//         </div>
//         <div>
//           <label>Author</label>
//           <input {...register('author', { required: "Author is required" })} />
//           {errors.author && <p>{errors.author.message}</p>}
//         </div>
//         <div>
//           <label>Genre</label>
//           <input {...register('genre', { required: "Genre is required" })} />
//           {errors.genre && <p>{errors.genre.message}</p>}
//         </div>
//         <div>
//           <label>Published Year</label>
//           <input type="number" {...register('publishedYear', { required: "Year is required" })} />
//           {errors.publishedYear && <p>{errors.publishedYear.message}</p>}
//         </div>
//         <div>
//           <label>Status</label>
//           <select {...register('status', { required: "Status is required" })}>
//             <option value="">Select</option>
//             <option value="Available">Available</option>
//             <option value="Issued">Issued</option>
//           </select>
//           {errors.status && <p>{errors.status.message}</p>}
//         </div>
//         <button type="submit">{book ? "Update" : "Add"}</button>
//         <button type="button" onClick={onClose}>Cancel</button>
//       </form>
//     </div>
//   );
// }

// export default BookForm;

import { useForm } from "react-hook-form";
import { addBook, updateBook } from "../api/bookService";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Box
} from "@mui/material";

function BookForm({ book, onClose }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: book || {}
  });

  const onSubmit = async (data) => {
    try {
      if (book) {
        await updateBook(book.id, data);
        toast.success("Book updated successfully ✅");
      } else {
        await addBook(data);
        toast.success("Book added successfully ✅");
      }
      onClose();
    } catch (error) {
      toast.error("❌ Failed to save book");
    }
  };

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{book ? "Edit Book" : "Add Book"}</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Title"
            fullWidth
            {...register("title", { required: "Title is required" })}
            error={!!errors.title}
            helperText={errors.title?.message}
          />

          <TextField
            label="Author"
            fullWidth
            {...register("author", { required: "Author is required" })}
            error={!!errors.author}
            helperText={errors.author?.message}
          />

          <TextField
            label="Genre"
            fullWidth
            {...register("genre", { required: "Genre is required" })}
            error={!!errors.genre}
            helperText={errors.genre?.message}
          />

          <TextField
            label="Published Year"
            type="number"
            fullWidth
            {...register("publishedYear", { required: "Year is required" })}
            error={!!errors.publishedYear}
            helperText={errors.publishedYear?.message}
          />

          <TextField
            select
            label="Status"
            fullWidth
            {...register("status", { required: "Status is required" })}
            error={!!errors.status}
            helperText={errors.status?.message}
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="Available">Available</MenuItem>
            <MenuItem value="Issued">Issued</MenuItem>
          </TextField>

          <DialogActions>
            <Button onClick={onClose} color="secondary" variant="outlined">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {book ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default BookForm;
