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
  Box,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

interface SearchResultsProps {
  books: Book[];
  handleAddToReadingList: (book: Book, student: string) => void;
  handleBookClick: (title: string) => void;
  selectedStudent: string;
  onClose: () => void;
  loading: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  books,
  handleAddToReadingList,
  handleBookClick,
  selectedStudent,
  onClose,
  loading,
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        position: "absolute",
        zIndex: 1,
        width: "100%",
        height: "300px",
        overflow: "auto",
      }}
    >
      <IconButton onClick={onClose} sx={{ float: "right", zIndex: "inherit" }}>
        <CloseIcon />
      </IconButton>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <CircularProgress />
        </Box>
      ) : (
        <List>
          {books.map((book, index) => (
            <ListItem key={index}>
              <Card
                sx={{
                  display: "flex",
                  width: "100%",
                  height: { xs: "200px", md: "fit-content" },
                }}
              >
                <ListItemButton onClick={() => handleBookClick(book.title)}>
                  <CardMedia
                    component="img"
                    image={`/${book.coverPhotoURL}`}
                    sx={{ width: 100 }}
                  />
                  <CardContent
                    sx={{ padding: { xs: "0px 0px 0px 10px", md: "auto" } }}
                  >
                    <ListItemText
                      primary={book.title}
                      secondary={book.author}
                      primaryTypographyProps={{
                        sx: { fontSize: { xs: "13px", md: "16px" } },
                      }}
                    />
                  </CardContent>
                </ListItemButton>
                <IconButton
                  edge="start"
                  color="primary"
                  sx={{ width: "50px", height: "50px", margin: "auto 5px" }}
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
      )}
    </Paper>
  );
};

export default SearchResults;
