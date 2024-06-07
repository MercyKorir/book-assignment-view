import React, { ChangeEvent } from "react";
import { Box, TextField } from "@mui/material";

interface BookSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const BookSearch: React.FC<BookSearchProps> = ({
  setSearchQuery,
  searchQuery,
}) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  return (
    <Box mb={3}>
      <TextField
        variant="standard"
        fullWidth
        label="Search Books"
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </Box>
  );
};

export default BookSearch;
