import React from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector to access Redux state
import { RootState } from "../redux/store";

const drawerWidth = 240;

const PermanentDrawer = () => {

  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: drawerWidth, 
          boxSizing: "border-box", 
          backgroundColor: darkMode ? "#333" : "#fff", 
          color: darkMode ? "#fff" : "#000", 
          borderRight: "1px solid", 
          borderColor: darkMode ? "#555" : "#ddd", 
        },
      }}
    >
      <Toolbar />
      <List>
        <ListItem disablePadding>
          <ListItemButton 
            component={Link} 
            to="/" 
            sx={{
              fontWeight: "bold", 
              textAlign: "center", 
              padding: "12px 16px",
              borderBottom: "1px solid", 
              borderColor: darkMode ? "#555" : "#ddd", 
              "&:hover": {
                backgroundColor: darkMode ? "#444" : "#f5f5f5", 
              }
            }}
          >
            <ListItemText primary="Add To-Do List" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton 
            component={Link} 
            to="/calendar" 
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              padding: "12px 16px",
              borderBottom: "1px solid",
              borderColor: darkMode ? "#555" : "#ddd",
              "&:hover": {
                backgroundColor: darkMode ? "#444" : "#f5f5f5",
              }
            }}
          >
            <ListItemText primary="Calendar" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton 
            component={Link} 
            to="/today-task" 
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              padding: "12px 16px",
              borderBottom: "1px solid",
              borderColor: darkMode ? "#555" : "#ddd",
              "&:hover": {
                backgroundColor: darkMode ? "#444" : "#f5f5f5",
              }
            }}
          >
            <ListItemText primary="Today's Task" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton 
            component={Link} 
            to="/completed-task" 
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              padding: "12px 16px",
              borderBottom: "1px solid",
              borderColor: darkMode ? "#555" : "#ddd",
              "&:hover": {
                backgroundColor: darkMode ? "#444" : "#f5f5f5",
              }
            }}
          >
            <ListItemText primary="Completed Task" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default PermanentDrawer;
