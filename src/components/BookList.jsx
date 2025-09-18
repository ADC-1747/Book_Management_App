// function BookList({ books, onEdit, onDelete }) {
//   return (
//     <table border="1" cellPadding="10" style={{ width: '100%', marginTop: '20px' }}>
//       <thead>
//         <tr>
//           <th>Title</th>
//           <th>Author</th>
//           <th>Genre</th>
//           <th>Year</th>
//           <th>Status</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {books.length === 0 ? (
//           <tr><td colSpan="6" style={{ textAlign: 'center' }}>No books found</td></tr>
//         ) : books.map(book => (
//           <tr key={book.id}>
//             <td>{book.title}</td>
//             <td>{book.author}</td>
//             <td>{book.genre}</td>
//             <td>{book.publishedYear}</td>
//             <td>{book.status}</td>
//             <td>
//               <button onClick={() => onEdit(book)}>Edit</button>
//               <button onClick={() => onDelete(book.id)}>Delete</button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

// export default BookList;


import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Button,
  Typography,
} from "@mui/material";

function BookList({ books, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper} sx={{ mt: 3, boxShadow: 3, borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle1" fontWeight="bold">
                Title
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" fontWeight="bold">
                Author
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" fontWeight="bold">
                Genre
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" fontWeight="bold">
                Year
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" fontWeight="bold">
                Status
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle1" fontWeight="bold">
                Actions
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Typography color="text.secondary">No books found</Typography>
              </TableCell>
            </TableRow>
          ) : (
            books.map((book) => (
              <TableRow key={book.id} hover>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell>{book.publishedYear}</TableCell>
                <TableCell>{book.status}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => onEdit(book)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => onDelete(book.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BookList;
