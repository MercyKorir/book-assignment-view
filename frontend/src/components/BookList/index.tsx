import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../../graphql/queries";
import { Book } from "../../types";
import {
  Grid,
  IconButton,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface BookListProps {
  onAddToReadingList: (book: Book, student: string) => void;
  searchQuery: string;
  selectedStudent: string;
  readingList: { [student: string]: Book[] };
}

const BookList: React.FC<BookListProps> = ({
  onAddToReadingList,
  searchQuery,
  selectedStudent,
  readingList,
}) => {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error.message}</p>;

  const filteredBooks = data.books.filter((book: Book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isBookInReadingList = (book: Book) =>
    readingList[selectedStudent]?.some((b) => b.title === book.title) || false;

  return (
    <Grid container spacing={2} sx={{ margin: "auto" }}>
      {filteredBooks.map((book: Book, index: any) => (
        <Grid item key={index} xs={12} sm={6} md={4} sx={{ margin: "auto" }}>
          <Card
            sx={{
              width: "400px",
              height: "400px",
              borderRadius: "20px",
              position: "relative",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            <CardMedia
              component="img"
              image={`/${book.coverPhotoURL}`}
              alt={book.title}
              sx={{
                margin: "auto",
                width: "auto",
                height: "60%",
                objectFit: "contain",
                objectPosition: "center",
                borderRadius: "50%",
              }}
            />
            <CardContent
              sx={{
                background: "rgba(90, 204, 204, 0.2)",
                height: "40%",
                padding: "20px 30px 0px 30px",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#335c6e" }}
              >
                {book.title}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "#4aa088" }}>
                {book.author}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(51, 92, 110, 0.7)" }}
              >
                Reading Level: {book.readingLevel}
              </Typography>
            </CardContent>
            <IconButton
              onClick={() => onAddToReadingList(book, selectedStudent)}
              disabled={!selectedStudent || isBookInReadingList(book)}
              sx={{
                width: "60px",
                height: "60px",
                position: "absolute",
                top: "50%",
                right: "5px",
                fontSize: "36px",
                borderRadius: "50%",
                boxShadow:
                  "0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
                backgroundColor: "rgba(247, 100, 52, 0.3)",
                color: "#000",
              }}
            >
              <AddIcon fontSize="inherit" />
            </IconButton>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BookList;
