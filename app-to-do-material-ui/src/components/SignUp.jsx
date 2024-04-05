import React, { useState, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import mainStore from "../stores/index.js";
import axios from "axios";
import { Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import WebcamComponent from "./Webcam.jsx";
import * as FormData from "form-data";

const defaultTheme = createTheme();

export default function SignUp({ setNewUser }) {
  const { setUserZustand } = mainStore();
  const navigate = useNavigate();

  const captureUser = async (dataLogin) => {
    setUserZustand(dataLogin);
    setNewUser(false);
    navigate("/");
  };

  const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: "user",
  };
  const [photo, setPhoto] = useState(null);
  const [openModal, setOpenModal] = useState(false)

  const handleOpen = () => setOpenModal(true)
  const handleClose = () => setOpenModal(false)
  
  function createUser(user) {
    let data = new FormData();

    data.append("name", user.name);
    data.append("email", user.email);
    data.append("password", user.password);
    data.append("type_user", "user");
    if (photo) {
      const binaryData = atob(photo.split(",")[1]);
      const arrayBuffer = new ArrayBuffer(binaryData.length);
      const uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
      }
      const newBlob = new Blob([uint8Array], { type: "image/jpeg" });

      const file = new File([newBlob], `photo_${user.name}_${user.email}`);
      data.append("photo", file);
      data.append("user_photo", file.name);
    }

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/users",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log("soy la response:", response);
        if (response.data.message == "Usuario Creado Correctamente") {
          captureUser({ name: user.name, password: user.password });
        }
      })
      .catch((error) => {
        console.log(error);
        alert(JSON.stringify(error.response.data));
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("password") != data.get("repeatPassword")) {
      alert("Los Password ingresados son diferentes");
      return;
    }
    createUser({
      name: data.get("firstName"),
      email: data.get("email"),
      password: data.get("password"),
      user_photo: photo,
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Modal
         open={openModal}
         onClose={handleClose}
         >
        
         <Box sx={{ position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,}}>
         <WebcamComponent photo={photo} setPhoto={setPhoto} handleClouse={handleClose}/>
          
         </Box>
       </Modal>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="User Name"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="repeatPassword"
                  label="Repita su Password"
                  type="password"
                  id="reapeatPassword"
                />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            
            {photo?  <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button> : <Button 
             fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleOpen}
            >First Take your Photo</Button> }
           
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link onClick={() => setNewUser(false)} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
