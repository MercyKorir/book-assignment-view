import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

interface AddStudentFormProps {
  addStudent: (student: string) => void;
}

const AddStudentForm: React.FC<AddStudentFormProps> = ({ addStudent }) => {
  const [studentName, setStudentName] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentName.trim()) {
      addStudent(studentName);
      setStudentName("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Student Name"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: "10px" }}
      >
        Add Student
      </Button>
    </form>
  );
};

export default AddStudentForm;
