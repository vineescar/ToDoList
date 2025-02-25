import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, toggleTodo, deleteTodo,fetchTodos } from "../redux/slices/todoSlice";
import { RootState, AppDispatch } from "../redux/store";
import {
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  IconButton,
  CardActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";

const TodoList: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [taskDate, setTaskDate] = useState<string>("");
  const [severity, setSeverity] = useState<"Low" | "Medium" | "High" | "Critical">("Low");

  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (task.trim() && description.trim() && taskDate.trim()) {
      dispatch(addTodo({ text: task, description, time, taskDate, severity }));
      setTask("");
      setDescription("");
      setTime("");
      setTaskDate("");
      setSeverity("Low");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: 3, p: 3, height: "100vh" }}>
      <Box sx={{ width: "50%", display: "flex", flexDirection: "column", gap: 1, borderRight: "2px solid #ddd", pr: 2 }}>
        <TextField
          fullWidth
          label="Task Title"
          variant="outlined"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <TextField
          fullWidth
          label="Task Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          fullWidth
          label="Time"
          type="time"
          InputLabelProps={{ shrink: true }}
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <TextField
          fullWidth
          label="Task Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={taskDate}
          onChange={(e) => setTaskDate(e.target.value)}
        />

        <FormControl fullWidth>
          <InputLabel>Severity</InputLabel>
          <Select
            value={severity}
            onChange={(e) => setSeverity(e.target.value as "Low" | "Medium" | "High" | "Critical")}
            label="Severity"
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Critical">Critical</MenuItem>
          </Select>
        </FormControl>

        <Button onClick={handleAddTodo} variant="contained" color="primary">
          Add Task
        </Button>
      </Box>

      <Box sx={{ flexGrow: 1, maxHeight: "calc(100vh - 120px)", overflowY: "auto" }}>
        {todos
          .filter((todo) => !todo.completed) 
          .slice(-5) 
          .map((todo) => (
                <Card
                  key={todo.id}
                  sx={{
                    mb: 2,
                    backgroundColor:
                      todo.severity === "Low"
                        ? "rgba(211, 255, 211, 0.5)"
                        : todo.severity === "Medium"
                        ? "rgba(255, 245, 177, 0.5)"
                        : todo.severity === "High"
                        ? "rgba(255, 179, 179, 0.5)"
                        : "rgba(255, 102, 102, 0.5)", 
                    height: "180px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between", 
                  }}
                >
                  <CardContent sx={{ paddingBottom: "8px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          textDecoration: todo.completed ? "line-through" : "none",
                          fontWeight: "bold",
                          fontFamily: "'Roboto', sans-serif", 
                          fontSize: "1.2rem",
                          lineHeight: "1.4", 
                          overflow: "hidden", 
                          textOverflow: "ellipsis",
                        }}
                      >
                        {todo.text}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          fontFamily: "'Roboto', sans-serif", 
                          fontSize: "1rem",
                          lineHeight: 1.3, 
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2, 
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {todo.description}
                      </Typography>
                      <Typography
                        variant="caption"
                        display="block"
                        sx={{
                          fontFamily: "'Roboto', sans-serif",
                          fontSize: "0.9rem",
                          mt: 1,
                          lineHeight: 1.3,
                        }}
                      >
                        Task Date: {todo.taskDate}
                      </Typography>
                      {todo.time && (
                        <Typography
                          variant="caption"
                          display="block"
                          sx={{
                            fontFamily: "'Roboto', sans-serif",
                            fontSize: "0.9rem",
                            mt: 1,
                            lineHeight: 1.3,
                          }}
                        >
                          Start Time: {todo.time}
                        </Typography>
                      )}
                      <Typography
                        variant="caption"
                        display="block"
                        sx={{
                          fontFamily: "'Roboto', sans-serif",
                          fontSize: "0.9rem",
                          mt: 1,
                          lineHeight: 1.3,
                        }}
                      >
                        Severity: {todo.severity}
                      </Typography>
                    </Box>

                    <CardActions sx={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "0" }}>
                      <IconButton onClick={() => dispatch(toggleTodo(todo.id))} color="success">
                        <CheckIcon />
                      </IconButton>
                      <IconButton onClick={() => dispatch(deleteTodo(todo.id))} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </CardContent>
                </Card>
          ))}
      </Box>
    </Box>
  );
};

export default TodoList;
