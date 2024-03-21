import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton,Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import useStore from '../stores/index.js';
import mainStore from "../stores/index.js"


export default function NavBar() {
    const navigate = useNavigate()
    const isUserConnected = useStore((state)=>state.isUserConnected)
    const {logOut} = mainStore()
  return (
    <Box sx={{ flexGrow: 1 }}>

     <AppBar position="static" color="primary">
       <Toolbar>

         <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          <MenuIcon/>
          </IconButton>

         <Typography variant="h6" sx={{ flexGrow: 1 }}>
           App To Do with Options
         </Typography>
        { !isUserConnected? <Button onClick={()=>navigate("/user")} color="secondary" variant='contained'>Login</Button> : <Button onClick={logOut} color="secondary" variant='contained'>Logout</Button>} 
        
       </Toolbar>
     </AppBar>
    </Box>
  )
}
