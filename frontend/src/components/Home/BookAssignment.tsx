import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

interface Book {
  title: string;
  author: string;
  readingLevel: number;
  imageUrl: string;
}

interface Student {
  name: string;
}

const bookData: Book[] = [
  {
    title: "Happy Knight and the magic spell",
    author: "Quinn Brown",
    readingLevel: 1,
    imageUrl:
      "https://cdn.pixabay.com/photo/2017/08/02/09/20/knight-2577132_960_720.jpg",
  },
  {
    title: "Happy Knight and the magic spell",
    author: "Quinn Brown",
    readingLevel: 1,
    imageUrl:
      "https://cdn.pixabay.com/photo/2017/08/02/09/20/knight-2577132_960_720.jpg",
  },
  {
    title: "Happy Knight and the magic spell",
    author: "Quinn Brown",
    readingLevel: 1,
    imageUrl:
      "https://cdn.pixabay.com/photo/2017/08/02/09/20/knight-2577132_960_720.jpg",
  },
  {
    title: "Happy Knight and the magic spell",
    author: "Quinn Brown",
    readingLevel: 1,
    imageUrl:
      "https://cdn.pixabay.com/photo/2017/08/02/09/20/knight-2577132_960_720.jpg",
  },
  {
    title: "Happy Knight and the magic spell",
    author: "Quinn Brown",
    readingLevel: 1,
    imageUrl:
      "https://cdn.pixabay.com/photo/2017/08/02/09/20/knight-2577132_960_720.jpg",
  },
  {
    title: "Happy Knight and the magic spell",
    author: "Quinn Brown",
    readingLevel: 1,
    imageUrl:
      "https://cdn.pixabay.com/photo/2017/08/02/09/20/knight-2577132_960_720.jpg",
  },
];

const studentData: Student[] = [
  {
    name: "Mercy Chelangat",
  },
  {
    name: "Mercy Chelangat",
  },
  {
    name: "Mercy Chelangat",
  },
];

const BookAssignment = () => {
  const [students, setStudents] = useState(studentData);
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);

  const handleAddStudent = (newStudentName: string) => {
    setStudents([...students, { name: newStudentName }]);
  };

  const handleAddBook = (book: Book) => {
    setSelectedBooks([...selectedBooks, book]);
  };

  const handleRemoveBook = (book: Book) => {
    setSelectedBooks(selectedBooks.filter((b) => b !== book));
  };

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={12} md={4}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Students
        </Typography>
        <ul>
          {students.map((student, index) => (
            <li key={index}>{student.name}</li>
          ))}
        </ul>
        <TextField
          label="Enter Student Name"
          variant="outlined"
          fullWidth
          sx={{ mt: 2 }}
        />
        <Button
          variant="contained"
          onClick={() => handleAddStudent("New Student")}
          sx={{ mt: 2 }}
        >
          Add Student
        </Button>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Books List
        </Typography>
        <Grid container spacing={2}>
          {bookData.map((book, index) => (
            <Grid item xs={12} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={book.imageUrl}
                  alt={book.title}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {book.author}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Reading Level: {book.readingLevel}
                  </Typography>
                </CardContent>
                <IconButton onClick={() => handleAddBook(book)}>
                  <AddCircleIcon />
                </IconButton>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Reading List
        </Typography>
        <Grid container spacing={2}>
          {selectedBooks.map((book, index) => (
            <Grid item xs={12} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={book.imageUrl}
                  alt={book.title}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {book.author}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Reading Level: {book.readingLevel}
                  </Typography>
                </CardContent>
                <IconButton onClick={() => handleRemoveBook(book)}>
                  <RemoveCircleIcon />
                </IconButton>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BookAssignment;
