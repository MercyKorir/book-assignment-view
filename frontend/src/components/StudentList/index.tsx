import React from "react";
import {
  List,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  ListItemButton,
  ListItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface StudentListProps {
  students: string[];
  selectStudent: (student: string) => void;
  removeStudent: (student: string) => void;
}

const StudentList: React.FC<StudentListProps> = ({
  students,
  selectStudent,
  removeStudent,
}) => {
  return (
    <div>
      <List>
        {students.map((student, index) => (
          <ListItem key={index}>
            <ListItemButton onClick={() => selectStudent(student)}>
              <ListItemText primary={student} />
            </ListItemButton>
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => removeStudent(student)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Button
        variant="contained"
        color="primary"
        onClick={() => selectStudent("")}
        style={{ marginBottom: "10px" }}
      >
        Clear Selected Student
      </Button>
    </div>
  );
};

export default StudentList;
