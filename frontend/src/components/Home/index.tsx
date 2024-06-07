import React, { useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import BookSearch from "../BookSearch";
import BookList from "../BookList";
import ReadingList from "../ReadingList";
import { Book } from "../../types";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [readingList, setReadingList] = useState<Book[]>([]);

  const handleAddToReadingList = (book: Book) => {
    setReadingList([...readingList, book]);
  };

  const handleRemoveFromReadingList = (book: Book) => {
    setReadingList(readingList.filter((b) => b.title !== book.title));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Book Assignment
      </Typography>
      <BookSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Search Results
          </Typography>
          <BookList
            searchQuery={searchQuery}
            onAddToReadingList={handleAddToReadingList}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Reading List
          </Typography>
          <ReadingList
            readingList={readingList}
            onRemoveFromReadingList={handleRemoveFromReadingList}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
