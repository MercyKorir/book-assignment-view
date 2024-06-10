import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  AppBar,
  Toolbar,
  IconButton,
  Box,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import BookSearch from "../BookSearch";
import BookList from "../BookList";
import ReadingList from "../ReadingList";
import StudentList from "../StudentList";
import AddStudentForm from "../StudentList/AddStudentForm";
import { Book } from "../../types";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../../graphql/queries";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [students, setStudents] = useState<string[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [readingList, setReadingList] = useState<{ [student: string]: Book[] }>(
    {}
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { loading, error, data } = useQuery(GET_BOOKS);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const addStudent = (student: string) => {
    setStudents([...students, student]);
  };

  const selectStudent = (student: string) => {
    setSelectedStudent(student);
  };

  const removeStudent = (student: string) => {
    setStudents(students.filter((s) => s !== student));
    const updatedReadingList = { ...readingList };
    delete updatedReadingList[student];
    setReadingList(updatedReadingList);
    if (selectedStudent === student) setSelectedStudent("");
  };

  const handleAddToReadingList = (book: Book, student: string) => {
    const updatedReadingList = { ...readingList };
    if (!updatedReadingList[student]) updatedReadingList[student] = [];
    updatedReadingList[student].push(book);
    setReadingList(updatedReadingList);
  };

  const handleRemoveFromReadingList = (book: Book, student: string) => {
    const updatedReadingList = { ...readingList };
    updatedReadingList[student] = updatedReadingList[student].filter(
      (b) => b.title !== book.title
    );
    setReadingList(updatedReadingList);
  };

  const handleBookClick = (title: string) => {
    const bookElement = document.getElementById(title);
    if (bookElement) {
      bookElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  if (loading || isLoading) {
    return (
      <Container>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: "100vh" }}
        >
          <CircularProgress />
        </Grid>
      </Container>
    );
  }
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container
      sx={{
        minWidth: "100vw",
        maxWidth: "100vw",
        minHeight: "100vh",
        paddingLeft: "0px !important",
        paddingRight: "0px !important",
      }}
    >
      <AppBar
        position="static"
        sx={{
          background: "#335C6E",
          height: "120px",
          justifyContent: "center",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            padding: "0px 200px",
          }}
        >
          <Box flexGrow={0.8}>
            <Typography
              variant="h4"
              textTransform="uppercase"
              gutterBottom
              sx={{ fontSize: "32px", color: "#ffffff", fontWeight: "bold" }}
            >
              Book Assignment
            </Typography>
          </Box>
          <Box flexGrow={1}>
            <BookSearch
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              books={data.books}
              handleAddToReadingList={handleAddToReadingList}
              handleBookClick={handleBookClick}
              selectedStudent={selectedStudent}
            />
          </Box>
          <Box
            flexGrow={1}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <IconButton
              onClick={handleThemeChange}
              sx={{ fontSize: "50px", color: "#fff" }}
            >
              <DarkModeIcon fontSize="inherit" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Grid container spacing={0}>
        <Grid
          item
          xs={12}
          sm={3.6}
          sx={{
            width: "100%",
            padding: "0px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "50px",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              background: "#fff",
              boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
              padding: "30px 15px",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: "32px", color: "#28B8B8", fontWeight: "bold" }}
            >
              Students
            </Typography>
            <StudentList
              students={students}
              selectStudent={selectStudent}
              removeStudent={removeStudent}
            />
            <AddStudentForm addStudent={addStudent} />
          </Box>
          <Box>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: "32px", color: "#28B8B8", fontWeight: "bold" }}
            >
              Reading List
            </Typography>
            <ReadingList
              readingList={readingList}
              onRemoveFromReadingList={handleRemoveFromReadingList}
              selectedStudent={selectedStudent}
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={8.4}
          sx={{
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            padding: "50px 300px 50px 100px",
            minHeight: "91.1vh",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              textAlign: "center",
              textTransform: "uppercase",
              fontSize: "42px",
              color: "#28B8B8",
              fontWeight: "bold",
            }}
          >
            Books List
          </Typography>
          <BookList
            searchQuery={searchQuery}
            onAddToReadingList={handleAddToReadingList}
            selectedStudent={selectedStudent}
            readingList={readingList}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
