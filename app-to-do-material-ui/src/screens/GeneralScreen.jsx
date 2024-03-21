import React, { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useStore from "../stores/index.js";
import TasksScreen from './TasksScreen.jsx';

export default function GeneralScreen() {
  const isUserConnected = useStore((state)=>state.isUserConnected)

  return (

   <Box 
      sx={{
        backgroundColor:"red",
        display:"flex",
        alignItems:"center",
        flexDirection:"column"
      }}
   > 
      {isUserConnected? <Typography variant='h1' color="initial" sx={{
        backgroundColor:"green",
             }}>El User esta logeado</Typography>:<Typography variant='h1' color="initial" sx={{
        backgroundColor:"red",
             }} >User isn't loged</Typography>}
         
       {isUserConnected? <TasksScreen/>:null}

   </Box>


  
  )
}
