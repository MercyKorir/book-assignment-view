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
  readingList: Book[];
  onRemoveFromReadingList: (book: Book) => void;
}

const ReadingList: React.FC<ReadingListProps> = ({
  readingList,
  onRemoveFromReadingList,
}) => {
  return (
    <List>
      {readingList.map((book: Book, index: any) => (
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
              <Typography variant="subtitle1">{book.author}</Typography>
              <Typography variant="body2">
                Reading Level: {book.readingLevel}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => onRemoveFromReadingList(book)}
                style={{ marginTop: "10px" }}
              >
                Remove from Reading List
              </Button>
            </CardContent>
          </Card>
        </ListItem>
      ))}
    </List>
  );
};

export default ReadingList;
