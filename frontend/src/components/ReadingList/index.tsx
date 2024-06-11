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
        maxHeight: { xs: "330px", md: "500px" },
        overflowY: "auto",
      }}
    >
      {selectedStudent && readingList[selectedStudent]?.length ? (
        readingList[selectedStudent].map((book: Book, index: any) => (
          <ListItem key={index}>
            <Card
              sx={{
                display: "flex",
                width: "100%",
                height: { xs: "150px", md: "fit-content" },
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: 100 }}
                image={`/${book.coverPhotoURL}`}
                alt={book.title}
              />
              <CardContent
                sx={{ padding: { xs: "8px 0px 0px 8px", md: "auto" } }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: "16px", md: "24px" },
                  }}
                >
                  {book.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "rgba(0,0,0,0.7)",
                    fontSize: { xs: "13px", md: "15px" },
                  }}
                >
                  {book.author}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(0,0,0,0.6)",
                    fontSize: { xs: "11px", md: "13px" },
                  }}
                >
                  Reading Level: {book.readingLevel}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => onRemoveFromReadingList(book, selectedStudent)}
                  sx={{
                    marginTop: "5px",
                    background: "#F76424",
                    height: "40px",
                    fontSize: { xs: "10px", md: "14px" },
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
