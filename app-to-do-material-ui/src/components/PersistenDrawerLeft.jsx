import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";

import {
  Button,
  Box,
  Drawer,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
 
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  Person,
  ListAltSharp,
  VerifiedUserSharp,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useStore from "../stores/index.js";
import mainStore from "../stores/index.js";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const isUserConnected = useStore((state) => state.isUserConnected);
  const user = useStore((state) => state.dataUser);
  const { logOut } = mainStore();
  const [showUser, setShowUser] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [createTask,setCreateTask] = useState(true)
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const showUserCard = () => {
    setOpen(false);
    setShowUser(true);
    navigate("/userShowCard");
  };
  const showEditUserCard = () => {
    setOpen(false);
    setEditUser(true);
    navigate("/editUserCard");
  };
  const showTaskScreenTable = () => {
    setOpen(false);
    setCreateTask(true)
    navigate("/taskScreenTable");
  };
  const showTaskScreenDragable = () => {
    setOpen(false);
    setCreateTask(false)
    navigate("/taskScreenDragable");
  };
  const logOutApp = () => {
    logOut();
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          {isUserConnected ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <Menu />
            </IconButton>
          ) : null}
          {isUserConnected ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Typography variant="h6" component="div">
                Welcome to App To Do user:
              </Typography>

              <Typography
                variant="h6"
                color="#cfd8dc"
                sx={{ marginLeft: "15px" }}
              >
                {user.name}
              </Typography>
            </Box>
          ) : (
            <Typography variant="h6" noWrap component="div">
              App To Do Material Ui
            </Typography>
          )}

          {!isUserConnected ? (
           
            <Button
              onClick={() => navigate("/user")}
              color="secondary"
              variant="contained"
              sx={{
                display: open ? "none" : "block",
                position: "absolute",
                right: 20,
              }}
            >
              Login
            </Button>
           

          ) : (
            <Box  sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                
              }}>
            <Button
              onClick={logOutApp}
              color="secondary"
              variant="contained"
              sx={{
                display: open ? "none" : "block",
                position: "absolute",
                right: 20,
              }}
            >
              Logout
            </Button>
           
           
            <Button
             color="success"
              variant="contained"
              onClick={()=>navigate("/createTaskScreen")}
              sx={{
                display: open ? "none" : "block",
                position: "absolute",
                right: 120,
              }}
            >
              Add New Task
            </Button>
          
         </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem>
            <ListItemButton onClick={showUserCard}>
              <ListItemIcon>
                <Person color="info" fontSize="large" />
              </ListItemIcon>
              User Card
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={showEditUserCard}>
              <ListItemIcon>
                <Person color="primary" fontSize="large" />
              </ListItemIcon>
              Edit User
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => console.log("tengo que borrar la info del user")}
            >
              <ListItemIcon>
                <VerifiedUserSharp color="error" fontSize="large" />
              </ListItemIcon>
              Delete User
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemButton onClick={showTaskScreenTable}>
              <ListItemIcon>
                <ListAltSharp fontSize="large" color="info" />
              </ListItemIcon>
              Task List Table
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              onClick={showTaskScreenDragable}
            >
              <ListItemIcon>
                <ListAltSharp fontSize="large" />
              </ListItemIcon>
              Task List Dragable
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              onClick={() =>
                console.log("tengo que borrar todas las tasks del user")
              }
            >
              <ListItemIcon>
                <ListAltSharp fontSize="large" />
              </ListItemIcon>
              Delete All Tasks
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() =>
                navigate("/faceEnjoy")
              }
            >
              <ListItemIcon>
                <ListAltSharp fontSize="large" />
              </ListItemIcon>
              Enjoy FaceApi
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
