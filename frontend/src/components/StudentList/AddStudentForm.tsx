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
        InputLabelProps={{
          style: {
            color: "rgba(51, 92, 110, 0.5)",
            fontSize: "18px",
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        style={{
          marginTop: "5px",
          background: "#335C6E",
          height: "50px",
        }}
      >
        Add Student
      </Button>
    </form>
  );
};

export default AddStudentForm;
