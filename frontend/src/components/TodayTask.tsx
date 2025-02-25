import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Box, Typography, Card, CardContent, Chip } from "@mui/material";
import dayjs from "dayjs";

const TodayTask = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);

  const today = dayjs().format("YYYY-MM-DD");

  const todayTasks = todos.filter((task) => dayjs(task.taskDate).format("YYYY-MM-DD") === today);

  const severityColors: Record<string, "success" | "warning" | "error" | "secondary" | "default"> = {
    Low: "success",
    Medium: "warning",
    High: "error",
    Critical: "secondary",
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Today's Tasks
      </Typography>

      {todayTasks.length > 0 ? (
        todayTasks.map((task) => (
          <Card
            key={task.id}
            sx={{
              marginBottom: 2,
              boxShadow: 3,
              backgroundColor: task.completed ? "#f0f0f0" : "white", 
              opacity: task.completed ? 0.7 : 1,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  textDecoration: task.completed ? "line-through" : "none",
                  color: task.completed ? "gray" : "black",
                }}
              >
                {task.text}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {task.description}
              </Typography>
              <Chip
                label={task.severity}
                color={severityColors[task.severity] || "default"}
                sx={{ marginTop: 1 }}
              />
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography color="text.secondary">No tasks for today.</Typography>
      )}
    </Box>
  );
};

export default TodayTask;
