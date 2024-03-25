import { Button, Container, ListItemIcon } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../stores/index.js";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Person } from "@mui/icons-material";

const UserType = (props) =>{
  if(props.props == "user"){
    return <Typography  variant="h5" color={"#20B6FF"}>Usuario</Typography>
   } else if(props.props == "admin"){
     return <Typography variant="h5" color={"#ff0000"} >Administrador</Typography>
   }

}

export default function UserCardScreen() {

  const [user, setUser] = useState(useStore((state)=>state.dataUser))
  
  const navigate = useNavigate();
  return (
    <Container maxWidth="sm" sx={{display:"flex", alignItems:"center", flexDirection:"column"}}>
       <Card sx={{ maxWidth: 345, margin:"30px", border:"solid 1px grey", display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center" }}>
       <ListItemIcon>
               <Person color="info" sx={{fontSize:"150px"}}/>
              </ListItemIcon>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Nombre de usuario: {user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Email: {user.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         Type User :
        </Typography>
        <UserType props={user.type_user}/>
         
      </CardContent>
      <CardActions>
        <Button size="small" color="error" variant="contained">Delete All Task</Button>
        <Button size="small" color="secondary" variant="contained" onClick={() => navigate("/editUserCard")}>Edit User</Button>
      <Button color="primary" variant="contained" size="small" onClick={() => navigate("/")}>
        Go Home
      </Button>
      </CardActions>
    </Card>
     
     

    </Container>
  );
}
