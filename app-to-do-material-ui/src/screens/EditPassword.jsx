import {
    Button,
    Container,
    ListItemIcon,
    TextField,
    FormLabel,
    Box,
    IconButton,
  } from "@mui/material";
  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import useStore from "../stores/index.js";
  import Card from "@mui/material/Card";
  import CardActions from "@mui/material/CardActions";
  import CardContent from "@mui/material/CardContent";
  import Typography from "@mui/material/Typography";
  import { Person, Visibility, VisibilityOff } from "@mui/icons-material";
  import mainStore from "../stores/index.js";

 
  
  export default function EditPasswordScreen() {
   
    const { changePassword } = mainStore();
    const [user, setUser] = useState(useStore((state) => state.dataUser));
    const [autorizated, setAUtorizated] = useState(false)
    const [visiblityOne, setVisiblityOne] = useState(false)
    const [visiblityTwo, setVisiblityTwo] = useState(false)



    function changeVisiblityOne() {
     const idCapture = document.getElementById("new_password")
     if( idCapture.type == "password"){
         idCapture.type = "text"
         setVisiblityOne(true)
     } else {
        idCapture.type = "password"
         setVisiblityOne(false)
     }
    }

    function changeVisiblityTwo() {
        const idCapture = document.getElementById("confirm_new_password")
        if( idCapture.type == "password"){
            idCapture.type = "text"
            setVisiblityTwo(true)
        } else {
           idCapture.type = "password"
            setVisiblityTwo(false)
        }
        
       }

    function verificaPass(event) {
        event.preventDefault();
        const pass = event.target.password.value
        console.log("datos:", pass, user.password)
        if(pass == user.password){
            setAUtorizated(true)
        }
       
        
    }

    function changeDataPassword(event) {
      event.preventDefault();
   
      if (event.target.new_password.value == event.target.confirm_new_password.value) {
            changePassword({password:event.target.new_password.value});
            navigate("/")
            return
      }
      alert("los password deben ser iguales!!")
    }
  
    const navigate = useNavigate();
    return (
      <Container
        maxWidth="sm"
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      >
        <Typography variant="h5">Edit your Password</Typography>
        <Card
          sx={{
            maxWidth: 345,
            margin: "20px",
            border: "solid 1px grey",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <ListItemIcon>
            <Person color="error" sx={{fontSize:"150px"}} />
          </ListItemIcon>
          <CardContent>

          {!autorizated? (

            <form onSubmit={verificaPass}>
           <FormLabel>
           <Typography gutterBottom variant="h6" component="div">
                  Ingrese su Password:
           </Typography>
           <TextField
                  size="small"
                  id="password"
                  type="password"
                  sx={{ marginBottom: "10px" }}
                />
                <Button color="success"
              variant="contained"
              size="small"
              sx={{margin:"5px",borderRadius:"10px"}} type="submit" >OK</Button>
           </FormLabel>
          </form>  
          )
            

          :(


         <form onSubmit={changeDataPassword}>
              <FormLabel>

                <Typography variant="body2" color="text.secondary">
                  ingrese su nuevo Password
                </Typography>

                <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-around"}}>

                <TextField
                  size="small"
                  id="new_password"
                  type="password"
                  sx={{ margin: "10px"}}
                />
                <IconButton onClick={changeVisiblityOne}>
                {!visiblityOne ?<VisibilityOff color="primary" /> :  <Visibility color="error" /> }
                </IconButton>

      
                </Box>
                
                
              <Typography variant="body2" color="text.secondary">
                Reingrese su nuevo Password
              </Typography>

              <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-around"}}>  
              <TextField
                  size="small"
                  type="password"
                  id="confirm_new_password"
                  sx={{ margin: "10px" }}
                />
                <IconButton onClick={changeVisiblityTwo}>
{!visiblityTwo ?<VisibilityOff color="primary" /> :  <Visibility color="error" /> }
                </IconButton>
      </Box>
                

               
              </FormLabel>

              <Button
                size="small"
                color="secondary"
                variant="contained"
                type="submit"
              >
               Confirm your change pass
              </Button>
            </form>
          )}

          

          </CardContent>
          <CardActions>
        
            <Button
              color="primary"
              variant="contained"
              size="small"
              onClick={() => navigate("/")}
            >
              Go Home
            </Button>
          </CardActions>
        </Card>
      </Container>
    );
  }
  
