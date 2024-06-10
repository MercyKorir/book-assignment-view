import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Book } from "../../types";
import SearchResults from "./SearchResults";
import ClearIcon from "@mui/icons-material/Clear";

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
  const [loading, setLoading] = useState<boolean>(false);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const textFieldRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setSearchQuery(e.target.value);
    setShowSearchResults(e.target.value.length > 0);
    setTimeout(() => {
      setLoading(false);
    }, 500);
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

  const handleClearSearch = () => {
    setSearchQuery("");
    setShowSearchResults(false);
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
        InputLabelProps={{
          style: {
            color: "#fff",
            fontSize: "24px",
          },
        }}
        InputProps={{
          style: {
            height: "40px",
            borderBottom: "1px solid #fff",
          },
          endAdornment: (
            <InputAdornment position="end" sx={{ marginRight: "15px" }}>
              <IconButton
                aria-label="clear search"
                onClick={handleClearSearch}
                edge="end"
                sx={{
                  visibility: searchQuery.length > 0 ? "visible" : "hidden",
                }}
              >
                <ClearIcon sx={{ color: "#fff" }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiInputBase-root:after": {
            borderBottom: "2px solid #53c2c2",
          },
          "& .MuiInput-root": {
            color: "#fff",
          },
        }}
      />
      {showSearchResults && (
        <div ref={searchResultsRef}>
          <SearchResults
            books={searchResults}
            handleAddToReadingList={handleAddToReadingList}
            handleBookClick={handleBookClick}
            selectedStudent={selectedStudent}
            onClose={() => setShowSearchResults(false)}
            loading={loading}
          />
        </div>
      )}
    </Box>
  );
};

export default BookSearch;
