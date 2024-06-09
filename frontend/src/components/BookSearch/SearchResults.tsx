import React from "react";
import { Book } from "../../types";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Card,
  CardMedia,
  CardContent,
  ListItemButton,
} from "@mui/material";
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
      style={{
        position: "absolute",
        zIndex: 1,
        width: "100%",
        height: "300px",
        overflow: "auto",
      }}
    >
      <IconButton onClick={onClose} style={{ float: "right", zIndex: "inherit" }}>
        <CloseIcon />
      </IconButton>
      <List>
        {books.map((book, index) => (
          <ListItem key={index}>
            <Card style={{ display: "flex", width: "100%" }}>
              <ListItemButton onClick={() => handleBookClick(book.title)}>
                <CardMedia
                  component="img"
                  image={`/${book.coverPhotoURL}`}
                  style={{ width: 100 }}
                />
                <CardContent>
                  <ListItemText primary={book.title} secondary={book.author} />
                </CardContent>
              </ListItemButton>
              <IconButton
                edge="start"
                color="primary"
                style={{ width: "50px", height: "50px", margin: "auto 5px" }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToReadingList(book, selectedStudent);
                }}
                disabled={!selectedStudent}
              >
                <AddIcon />
              </IconButton>
            </Card>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default SearchResults;
