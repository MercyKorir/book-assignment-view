import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Box, TextField } from "@mui/material";
import { Book } from "../../types";
import SearchResults from "./SearchResults";

interface BookSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  books: Book[];
  handleAddToReadingList: (book: Book, student: string) => void;
  handleBookClick: (title: string) => void;
  selectedStudent: string;
}

const BookSearch: React.FC<BookSearchProps> = ({
  setSearchQuery,
  searchQuery,
  books,
  handleAddToReadingList,
  handleBookClick,
  selectedStudent,
}) => {
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const textFieldRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSearchResults(e.target.value.length > 0);
  };

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as Node;
    if (
      searchResultsRef.current &&
      !searchResultsRef.current.contains(target) &&
      textFieldRef.current &&
      !textFieldRef.current.contains(target)
    ) {
      setShowSearchResults(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const searchResults = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClickInside = () => {
    if (searchResults.length > 0) {
      setShowSearchResults(true);
    }
  };

  return (
    <Box mb={3} position="relative">
      <TextField
        inputRef={textFieldRef}
        variant="standard"
        fullWidth
        label="Search Books"
        value={searchQuery}
        onChange={handleSearchChange}
        onMouseDown={handleClickInside}
      />
      {showSearchResults && (
        <div ref={searchResultsRef}>
          <SearchResults
            books={searchResults}
            handleAddToReadingList={handleAddToReadingList}
            handleBookClick={handleBookClick}
            selectedStudent={selectedStudent}
            onClose={() => setShowSearchResults(false)}
          />
        </div>
      )}
    </Box>
  );
};

export default BookSearch;
