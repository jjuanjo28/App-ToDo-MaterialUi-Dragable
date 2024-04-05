import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import PersistentDrawerLeft from "./components/PersistenDrawerLeft";
import UserScreen from "./screens/UserScreen";
import GeneralScreen from "./screens/GeneralScreen";
import NavBar from "./components/NavBar";
import Stack from "@mui/material/Stack";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { lightBlue, purple } from "@mui/material/colors";
import UserCardScreen from "./screens/UserCardScreen";
import EditUserScreen from "./screens/EditUserScreen";
import EditPasswordScreen from "./screens/EditPassword";
import TasksScreenTable from "./screens/TasksScreenTable";
import TasksScreenDragable from "./screens/TasksScreenDragable";
import CreateTaskScreen from "./screens/CreateTaskScreen";
import FaceEnjoy from "./screens/FaceEnjoy";


const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: lightBlue[300],
    },
  },
});



ReactDOM.createRoot(document.getElementById("root")).render(
  
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <Router>
          <Stack spacing={6}>
            <PersistentDrawerLeft/>
          </Stack>
          <Routes>
            <Route exact path="/" element={<GeneralScreen />} />
            <Route path="/user" element={<UserScreen />} />
            <Route path="/userShowCard" element={<UserCardScreen/>}/>
            <Route path="/editUserCard" element={<EditUserScreen/>}/>
            <Route path="/editUserPass" element={<EditPasswordScreen/>}/>
            <Route path="/taskScreenTable" element={<TasksScreenTable/>} />
            <Route path="/taskScreenDragable" element={<TasksScreenDragable/>}/>
            <Route path="/createTaskScreen" element={<CreateTaskScreen/>}/>
            <Route path="/faceEnjoy" element={<FaceEnjoy/>}/>
          </Routes>
        </Router>
      </ThemeProvider>
    </CssBaseline>
  
);
