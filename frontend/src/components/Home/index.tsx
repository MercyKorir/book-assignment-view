import React, { useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import BookSearch from "../BookSearch";
import BookList from "../BookList";
import ReadingList from "../ReadingList";
import StudentList from "../StudentList";
import AddStudentForm from "../StudentList/AddStudentForm";
import { Book } from "../../types";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [students, setStudents] = useState<string[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [readingList, setReadingList] = useState<{ [student: string]: Book[] }>(
    {}
  );

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

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Book Assignment
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <Typography variant="h6" gutterBottom>
            Students
          </Typography>
          <StudentList
            students={students}
            selectStudent={selectStudent}
            removeStudent={removeStudent}
          />
          <AddStudentForm addStudent={addStudent} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Typography variant="h6" gutterBottom>
            Search Results
          </Typography>
          <BookSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <BookList
            searchQuery={searchQuery}
            onAddToReadingList={handleAddToReadingList}
            selectedStudent={selectedStudent}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Reading List
          </Typography>
          <ReadingList
            readingList={readingList}
            onRemoveFromReadingList={handleRemoveFromReadingList}
            selectedStudent={selectedStudent}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
