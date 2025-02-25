import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { useSelector } from "react-redux"; // Import useSelector to get the theme from Redux
import PermanentDrawer from "./components/PermanentDrawer";
import ToolbarComponent from "./components/ToolbarComponent";
import Calendar from "./components/Calendar";
import TodayTask from "./components/TodayTask";
import TodoList from "./components/TodoList";
import CompletedTask from "./components/CompletedTask";
import { RootState } from "./redux/store";

const App: React.FC = () => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode); // Get darkMode from Redux

  // Define theme colors
  const lightTheme = {
    background: "#F7F7F7", // Light background
  };

  const darkTheme = {
    background: "#9c9a97", // Dark background
  };

  return (
    <Router>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflow: 'hidden',
          backgroundColor: darkMode ? darkTheme.background : lightTheme.background, 
        }}
      >
        <ToolbarComponent />
        <Box sx={{ display: "flex", flexGrow: 1, marginTop: 6 }}>
          <PermanentDrawer />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Routes>
              <Route path="/" element={<TodoList />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/today-task" element={<TodayTask />} />
              <Route path="/completed-task" element={<CompletedTask />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
