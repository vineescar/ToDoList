import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/slices/themeSlice";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { RootState } from "../redux/store";

const ToolbarComponent: React.FC = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{
        width: '100%', 
        zIndex: 1201, 
        position: 'fixed', 
        boxShadow: 'none',
        backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.05)', 
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontFamily: '"Pacifico", cursive',
            fontSize: '1.5rem',
            letterSpacing: '2px',
            color: darkMode ? '#fff' : '#333', 
          }}
        >
          ToDoList
        </Typography>
        
        <IconButton color="inherit" onClick={handleThemeToggle}>
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default ToolbarComponent;
