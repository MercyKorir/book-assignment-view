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
  Drawer,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const addStudent = (student: string) => {
    setStudents([...students, student]);
    toast.success(`${student} added successfully!`);
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
    toast.success(`${student} removed successfully!`);
  };

  const handleAddToReadingList = (book: Book, student: string) => {
    const updatedReadingList = { ...readingList };
    if (!updatedReadingList[student]) updatedReadingList[student] = [];
    updatedReadingList[student].push(book);
    setReadingList(updatedReadingList);
    toast.success(`Added ${book.title} to reading list for ${student}!`);
  };

  const handleRemoveFromReadingList = (book: Book, student: string) => {
    const updatedReadingList = { ...readingList };
    updatedReadingList[student] = updatedReadingList[student].filter(
      (b) => b.title !== book.title
    );
    setReadingList(updatedReadingList);
    toast.success(`Removed ${book.title} from reading list for ${student}!`);
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
  if (error) {
    toast.error(`Error occurred: ${error.message}`);
  }

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
      <ToastContainer />
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
            padding: { xs: "0px 20px", sm: "0px 50px", md: "0px 200px" },
          }}
        >
          <Box flexGrow={0.8}>
            <Typography
              variant="h4"
              textTransform="uppercase"
              gutterBottom
              sx={{
                fontSize: "32px",
                color: "#ffffff",
                fontWeight: "bold",
                display: { xs: "none", md: "block" },
              }}
            >
              Book Assignment
            </Typography>
          </Box>
          <Box flexGrow={1} sx={{ width: { xs: "100%", md: "auto" } }}>
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
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
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
      {!drawerOpen && (
        <IconButton
          onClick={() => setDrawerOpen(!drawerOpen)}
          sx={{
            display: { xs: "block", md: "none" },
            marginTop: "10px",
            background: "#fff",
            borderRadius: "0px 8px 8px 0px",
            color: "#5ACCCC",
            fontSize: "30px",
            boxShadow:
              "0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          <ArrowForwardIosIcon
            fontSize="inherit"
            style={{ marginTop: "6px" }}
          />
        </IconButton>
      )}
      <Grid container spacing={0}>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          sx={{
            display: { xs: "flex", md: "none" },
            flexDirection: "column",
            alignItems: "center",
            width: "100vw",
            "& .MuiDrawer-paper": { width: "100vw" },
            height: "100vh",
            maxHeight: "100vh",
            overflow: "hidden",

            position: "relative",
            gap: { xs: "10px", md: "20px" },
            textAlign: "center",
          }}
        >
          {drawerOpen && (
            <IconButton
              onClick={() => setDrawerOpen(!drawerOpen)}
              sx={{
                position: "absolute",
                marginTop: "10px",
                right: "0",
                display: { xs: "block", md: "none" },
                background: "#fff",
                borderRadius: "8px 0px 0px 8px",
                color: "#5ACCCC",
                fontSize: "30px",
                boxShadow:
                  "0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              <ArrowBackIosIcon
                fontSize="inherit"
                style={{
                  marginTop: "6px",
                  marginRight: "-5px",
                  paddingLeft: "5px",
                }}
              />
            </IconButton>
          )}
          <Box
            sx={{
              padding: "15px",
              background: "#fff",
              boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
              width: "70%",
              margin: "0 auto",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontSize: { xs: "26px", md: "32px" },
                color: "#28B8B8",
                fontWeight: "bold",
              }}
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
          <Box
            sx={{
              padding: { xs: "0px", md: "20px" },
              marginTop: { xs: "10px", md: "0px" },
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontSize: { xs: "26px", md: "32px" },
                color: "#28B8B8",
                fontWeight: "bold",
              }}
            >
              Reading List
            </Typography>
            <ReadingList
              readingList={readingList}
              onRemoveFromReadingList={handleRemoveFromReadingList}
              selectedStudent={selectedStudent}
            />
          </Box>
        </Drawer>
        <Grid
          item
          xs={12}
          sm={3.6}
          sx={{
            width: "100%",
            padding: "0px",
            display: { xs: "none", md: "flex" },
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
            padding: {
              xs: "0px 10px",
              sm: "0px 20px",
              md: "50px 300px 50px 100px",
            },
            minHeight: { xs: "auto", md: "91.1vh" },
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              textAlign: "center",
              textTransform: "uppercase",
              fontSize: { xs: "36px", md: "42px" },
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
