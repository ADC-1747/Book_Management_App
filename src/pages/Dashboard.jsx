// import { useState, useEffect } from 'react';
// import { getBooks, deleteBook } from '../api/bookService';
// import BookList from '../components/BookList';
// import BookForm from '../components/BookForm';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function Dashboard() {
//   const [books, setBooks] = useState([]);
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState('');
//   const [filter, setFilter] = useState({ genre: '', status: '' });
//   const [loading, setLoading] = useState(false);
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [formOpen, setFormOpen] = useState(false);

//   const fetchBooks = async () => {
//     try {
//       setLoading(true);
//       const res = await getBooks();
//       setBooks(res.data);
//     } catch (error) {
//       toast.error("Error fetching books");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this book?")) return;
//     try {
//       await deleteBook(id);
//       toast.success("Book deleted");
//       fetchBooks();
//     } catch (error) {
//       toast.error("Failed to delete book");
//     }
//   };

//   // Filtered books based on search & filter
//   const filteredBooks = books.filter(book => {
//     return (
//       (book.title.toLowerCase().includes(search.toLowerCase()) ||
//       book.author.toLowerCase().includes(search.toLowerCase())) &&
//       (filter.genre ? book.genre === filter.genre : true) &&
//       (filter.status ? book.status === filter.status : true)
//     );
//   });

//   // Pagination
//   const booksPerPage = 10;
//   const paginatedBooks = filteredBooks.slice((page - 1) * booksPerPage, page * booksPerPage);
//   const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

//   const handlePrev = () => page > 1 && setPage(page - 1);
//   const handleNext = () => page < totalPages && setPage(page + 1);
//   const handlePageClick = (pageNumber) => setPage(pageNumber);

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Book Dashboard</h1>
//       <button onClick={() => { setSelectedBook(null); setFormOpen(true); }}>
//         Add Book
//       </button>
//       <input
//         type="text"
//         placeholder="Search by title or author"
//         value={search}
//         onChange={e => { setSearch(e.target.value); setPage(1); }} // Reset page on search
//       />
//       <select onChange={e => { setFilter({...filter, genre: e.target.value}); setPage(1); }}>
//         <option value="">All Genres</option>
//         <option value="Fiction">Fiction</option>
//         <option value="Science">Science</option>
//         <option value="History">History</option>
//         <option value="Adventure">Adventure</option>
//         <option value="Romance">Romance</option>
//       </select>
//       <select onChange={e => { setFilter({...filter, status: e.target.value}); setPage(1); }}>
//         <option value="">All Status</option>
//         <option value="Available">Available</option>
//         <option value="Issued">Issued</option>
//       </select>
      
//       {loading ? <div>Loading...</div> : (
//         <BookList 
//           books={paginatedBooks} 
//           onEdit={(book) => { setSelectedBook(book); setFormOpen(true); }}
//           onDelete={handleDelete} 
//         />
//       )}

//       {/* Pagination Controls */}
//       {totalPages > 1 && (
//         <div style={{ marginTop: '20px' }}>
//           <button onClick={handlePrev} disabled={page === 1}>Prev</button>

//           {Array.from({ length: totalPages }, (_, idx) => (
//             <button
//               key={idx + 1}
//               onClick={() => handlePageClick(idx + 1)}
//               style={{
//                 margin: '0 5px',
//                 fontWeight: page === idx + 1 ? 'bold' : 'normal'
//               }}
//             >
//               {idx + 1}
//             </button>
//           ))}

//           <button onClick={handleNext} disabled={page === totalPages}>Next</button>
//         </div>
//       )}

//       {formOpen && (
//         <BookForm 
//           book={selectedBook} 
//           onClose={() => { setFormOpen(false); fetchBooks(); }} 
//         />
//       )}

//       <ToastContainer />
//     </div>
//   );
// }

// export default Dashboard;


import { useState, useEffect } from "react";
import { getBooks, deleteBook } from "../api/bookService";
import BookList from "../components/BookList";
import BookForm from "../components/BookForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Container,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Box,
  Pagination
} from "@mui/material";

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({ genre: "", status: "" });
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [formOpen, setFormOpen] = useState(false);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await getBooks();
      setBooks(res.data);
    } catch (error) {
      toast.error("Error fetching books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await deleteBook(id);
      toast.success("Book deleted");
      fetchBooks();
    } catch (error) {
      toast.error("Failed to delete book");
    }
  };

  // Filtered books based on search & filter
  const filteredBooks = books.filter((book) => {
    return (
      (book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())) &&
      (filter.genre ? book.genre === filter.genre : true) &&
      (filter.status ? book.status === filter.status : true)
    );
  });

  // Pagination
  const booksPerPage = 10;
  const paginatedBooks = filteredBooks.slice(
    (page - 1) * booksPerPage,
    page * booksPerPage
  );
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const handlePageChange = (_, value) => setPage(value);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        📚 Book Dashboard
      </Typography>

      {/* Top Controls */}
      <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setSelectedBook(null);
            setFormOpen(true);
          }}
        >
          Add Book
        </Button>

        <TextField
          label="Search by title or author"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          sx={{ flexGrow: 1 }}
        />

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Genre</InputLabel>
          <Select
            value={filter.genre}
            label="Genre"
            onChange={(e) => {
              setFilter({ ...filter, genre: e.target.value });
              setPage(1);
            }}
          >
            <MenuItem value="">All Genres</MenuItem>
            <MenuItem value="Fiction">Fiction</MenuItem>
            <MenuItem value="Science">Science</MenuItem>
            <MenuItem value="History">History</MenuItem>
            <MenuItem value="Adventure">Adventure</MenuItem>
            <MenuItem value="Romance">Romance</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filter.status}
            label="Status"
            onChange={(e) => {
              setFilter({ ...filter, status: e.target.value });
              setPage(1);
            }}
          >
            <MenuItem value="">All Status</MenuItem>
            <MenuItem value="Available">Available</MenuItem>
            <MenuItem value="Issued">Issued</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Book List */}
      {loading ? (
        <Box textAlign="center" py={4}>
          <CircularProgress />
        </Box>
      ) : (
        <BookList
          books={paginatedBooks}
          onEdit={(book) => {
            setSelectedBook(book);
            setFormOpen(true);
          }}
          onDelete={handleDelete}
        />
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Box mt={3} display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}

      {/* Form Modal */}
      {formOpen && (
        <BookForm
          book={selectedBook}
          onClose={() => {
            setFormOpen(false);
            fetchBooks();
          }}
        />
      )}

      <ToastContainer />
    </Container>
  );
}

export default Dashboard;
