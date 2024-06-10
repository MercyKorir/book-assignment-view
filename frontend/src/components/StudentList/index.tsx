import React from "react";
import {
  List,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  ListItemButton,
  ListItem,
  Typography,
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
      <List
        sx={{
          background: "#fff",
          marginBottom: "10px",
          width: "100%",
          height: "180px",
          maxHeight: "180px",
          overflowY: "auto",
          boxShadow: "inset 2px 2px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        {students.map((student, index) => (
          <ListItem key={index} sx={{ margin: "0px", padding: "0px" }}>
            <ListItemButton onClick={() => selectStudent(student)}>
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "22px", color: "#335C6E" }}
                  >
                    {index + 1}. {student}
                  </Typography>
                }
              />
            </ListItemButton>
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => removeStudent(student)}
                sx={{ fontSize: "30px", color: "#5ACCCC" }}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Button
        variant="contained"
        color="primary"
        onClick={() => selectStudent("")}
        style={{
          background: "#335C6E",
          height: "50px",
          width: "250px",
          marginBottom: "5px",
        }}
      >
        Clear Selected Student
      </Button>
    </div>
  );
};

export default StudentList;
