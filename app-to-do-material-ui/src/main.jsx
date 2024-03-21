import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserScreen from "./screens/UserScreen";
import TasksScreen from "./screens/TasksScreen";
import Cookies from "universal-cookie";
import GeneralScreen from "./screens/GeneralScreen";
import NavBar from "./components/NavBar";
import Stack from "@mui/material/Stack";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { lightBlue, purple } from "@mui/material/colors";

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
  <React.StrictMode>
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <Router>
          <Stack spacing={6}>
            <NavBar />
          </Stack>
          <Routes>
            <Route exact path="/" element={<GeneralScreen />} />
            <Route path="/user" element={<UserScreen />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </CssBaseline>
  </React.StrictMode>
);
