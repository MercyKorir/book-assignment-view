import React from "react";
import { Book } from "../../types";
import {
  List,
  ListItem,
  Button,
  Card,
  CardContent,
  Typography,
  CardMedia,
} from "@mui/material";

interface ReadingListProps {
  readingList: { [student: string]: Book[] };
  onRemoveFromReadingList: (book: Book, student: string) => void;
  selectedStudent: string;
}

const ReadingList: React.FC<ReadingListProps> = ({
  readingList,
  onRemoveFromReadingList,
  selectedStudent,
}) => {
  return (
    <List
      sx={{
        width: "100%",
        maxHeight: "500px",
        overflowY: "auto",
      }}
    >
      {selectedStudent && readingList[selectedStudent]?.length ? (
        readingList[selectedStudent].map((book: Book, index: any) => (
          <ListItem key={index}>
            <Card style={{ display: "flex", width: "100%" }}>
              <CardMedia
                component="img"
                style={{ width: 100 }}
                image={`/${book.coverPhotoURL}`}
                alt={book.title}
              />
              <CardContent>
                <Typography variant="h6">{book.title}</Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "rgba(0,0,0,0.7)",
                    fontSize: "15px",
                  }}
                >
                  {book.author}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(0,0,0,0.6)",
                    fontSize: "13px",
                  }}
                >
                  Reading Level: {book.readingLevel}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => onRemoveFromReadingList(book, selectedStudent)}
                  style={{
                    marginTop: "5px",
                    background: "#F76424",
                    height: "40px",
                  }}
                >
                  Remove from Reading List
                </Button>
              </CardContent>
            </Card>
          </ListItem>
        ))
      ) : selectedStudent ? (
        <Typography>No books assigned to {selectedStudent}</Typography>
      ) : (
        <Typography>Select a student to view their reading list</Typography>
      )}
    </List>
  );
};

export default ReadingList;
