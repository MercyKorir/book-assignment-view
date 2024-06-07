import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../../graphql/queries";
import { Book } from "../../types";
import {
  List,
  ListItem,
  Button,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

interface BookListProps {
  onAddToReadingList: (book: Book, student: string) => void;
  searchQuery: string;
  selectedStudent: string;
}

const BookList: React.FC<BookListProps> = ({
  onAddToReadingList,
  searchQuery,
  selectedStudent,
}) => {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error.message}</p>;

  const filteredBooks = data.books.filter((book: Book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <List>
      {filteredBooks.map((book: Book, index: any) => (
        <ListItem key={index}>
          <Card style={{ display: "flex", width: "100%" }}>
            <CardMedia
              component="img"
              image={`/${book.coverPhotoURL}`}
              alt={book.title}
              style={{ width: 100 }}
            />
            <CardContent>
              <Typography variant="h6">{book.title}</Typography>
              <Typography variant="subtitle1">{book.author}</Typography>
              <Typography variant="body2">
                Reading Level: {book.readingLevel}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => onAddToReadingList(book, selectedStudent)}
                disabled={!selectedStudent}
                style={{ marginTop: "10px" }}
              >
                {selectedStudent
                  ? `Assign to ${selectedStudent}`
                  : "Select a Student"}
              </Button>
            </CardContent>
          </Card>
        </ListItem>
      ))}
    </List>
  );
};

export default BookList;
