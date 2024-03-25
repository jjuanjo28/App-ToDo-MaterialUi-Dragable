import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useStore from "../stores/index.js";
import ShowCircle from "../components/ShowCircle.jsx";

export default function GeneralScreen() {
  const isUserConnected = useStore((state) => state.isUserConnected);

  return (
    <Container sx={{ backgroundColor: "red" }}>
      <Box
        sx={{
          backgroundColor: "black",
          display: "flex",
          alignItems: "center",
          flexDirection: { xs: "column", sm: "row" }, // Cambia la dirección de la columna a fila en pantallas más grandes
          textAlign: { xs: "center", sm: "left" }, // Centra el contenido en pantallas pequeñas y alinea a la izquierda en pantallas más grandes
          flexWrap: 'wrap',
          px: { xs: 2, sm: 0 }, // Agrega espacio horizontal en pantallas pequeñas
          py: { xs: 4, sm: 0 },
        }}
      >
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-around", width:"auto"}}>
        <ShowCircle/>
        </Box>

        <Box
          sx={{
            marginTop: { xs: 2, sm: 0 },
            marginLeft: { xs: 0, sm: "10rem" },
          }}
        >
          <Typography
            sx={{ color: "white", fontSize: { xs: "40px", sm: "90px" } }}
          >
            App To Do
          </Typography>
          <Typography
            sx={{ color: "white", fontSize: { xs: "20px", sm: "30px" } }}
          >
            Material Ui -- Dragable Version
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
