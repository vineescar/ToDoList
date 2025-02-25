import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { deleteTodo,fetchTodos } from "../redux/slices/todoSlice";
import {
  Box,
  Typography,
  List,
  IconButton,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CompletedTask: React.FC = () => {
  const completedTodos = useSelector((state: RootState) =>
    state.todos.todos.filter((todo) => todo.completed)
  );
  const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
      dispatch(fetchTodos());
    }, [dispatch]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Completed Tasks
      </Typography>

      {completedTodos.length === 0 ? (
        <Typography color="text.secondary">No completed tasks yet.</Typography>
      ) : (
        <List>
          {completedTodos.map((todo) => (
            <Card
              key={todo.id}
              sx={{
                marginBottom: 2,
                boxShadow: 3,
                backgroundColor: "#fafafa", 
                opacity: 0.9, 
                borderRadius: 3,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    textDecoration: "line-through",
                    color: "gray",
                    fontWeight: "bold",
                    flex: 1,
                    wordBreak: "break-word",
                  }}
                >
                  {todo.text}
                </Typography>
                <CardActions>
                  <IconButton
                    onClick={() => dispatch(deleteTodo(todo.id))}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </CardContent>
              <CardContent sx={{ paddingTop: 0 }}>
                <Typography variant="caption" color="text.secondary">
                  {todo.description}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Completed On: {todo.taskDate}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </List>
      )}
    </Box>
  );
};

export default CompletedTask;
