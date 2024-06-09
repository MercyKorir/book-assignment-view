import React from "react";
import { Book } from "../../types";
import { List, ListItem, ListItemText, IconButton, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

interface SearchResultsProps {
  books: Book[];
  handleAddToReadingList: (book: Book, student: string) => void;
  handleBookClick: (title: string) => void;
  selectedStudent: string;
  onClose: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  books,
  handleAddToReadingList,
  handleBookClick,
  selectedStudent,
  onClose,
}) => {
  return (
    <Paper
      elevation={3}
      style={{ position: "absolute", zIndex: 1, width: "100%" }}
    >
      <IconButton onClick={onClose} style={{ float: "right" }}>
        <CloseIcon />
      </IconButton>
      <List>
        {books.map((book) => (
          <ListItem key={book.title} disableGutters>
            <ListItemText
              primary={book.title}
              secondary={book.author}
              onClick={() => handleBookClick(book.title)}
              style={{ cursor: "pointer" }}
            />
            <IconButton
              edge="end"
              color="primary"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToReadingList(book, selectedStudent);
              }}
            >
              <AddIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default SearchResults;
