import {
  Button,
  Container,
  ListItemIcon,
  TextField,
  FormLabel,
  Box,
  Modal
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../stores/index.js";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Person } from "@mui/icons-material";
import mainStore from "../stores/index.js";
import WebcamComponent from "../components/Webcam.jsx";

const UserType = (props) => {

  if (props.props == "user") {
    return (
      <Typography variant="h5" color={"#20B6FF"}>
        Usuario
      </Typography>
    );
  } else if (props.props == "admin") {
    return (
      <Typography variant="h5" color={"#ff0000"}>
        Administrador
      </Typography>
    );
  }
};

export default function EditUserScreen() {
  const { editUser } = mainStore();
  const [user, setUser] = useState(useStore((state) => state.dataUser));
  const [photo, setPhoto] = useState(null);
  const [openModal, setOpenModal] = useState(false)

  const handleOpen = () => setOpenModal(true)
  const handleClose = () => setOpenModal(false)

  function changeDataUser(event) {
    event.preventDefault();
    const newDataUser = {
      name: event.target.new_name.value,
      email: event.target.new_email.value,
      
    };
    if (newDataUser.name == "") {
      newDataUser.name = user.name;
    }
    if (newDataUser.email == "") {
      newDataUser.email = user.email;
    }
    editUser(newDataUser);
    navigate("/")
  }

  const navigate = useNavigate();
  return (
    <Container
      maxWidth="sm"
      sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Typography variant="h5">Edit your user</Typography>
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
      {user.user_photo ? (
        <Box style={{display:"flex", flexDirection:"column",}}>

       
        <img
          src={`http://localhost:3000/uploads/${user.user_photo}.jpg`}
          style={{margin:"20px", height:"150px", borderRadius:"80px"}}
          /> <Button
              size="small"
              color="primary"
              variant="contained"
              onClick={handleOpen}
          >Take a new photo</Button> 
         
           </Box>
          ) : (  <ListItemIcon>
               <Person color="info" sx={{fontSize:"150px"}}/>
       </ListItemIcon>) }
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
         <WebcamComponent photo={photo} setPhoto={setPhoto} handleClose={handleClose}/>
          
         </Box>
       </Modal>

        <CardContent>
          <form onSubmit={changeDataUser}>
            <FormLabel>
              <Typography gutterBottom variant="h6" component="div">
                Nombre de usuario: {user.name}
              </Typography>
              <TextField
                size="small"
                id="new_name"
                label={`${user.name}`}
                sx={{ margin: "10px" }}
              />
              <Typography variant="body2" color="text.secondary">
                Email: {user.email}
              </Typography>
              <TextField
                size="small"
                id="new_email"
                label={`${user.email}`}
                sx={{ margin: "10px" }}
              />
            </FormLabel>
            <Typography variant="body2" color="text.secondary">
              Type User :
              <UserType props={user.type_user} />
            </Typography>

            <Button
              size="small"
              color="secondary"
              variant="contained"
              type="submit"
            >
              Change you personal data
            </Button>
          </form>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="error"
            variant="contained"
            onClick={() => navigate("/editUserPass")}
          >
            Change your password
          </Button>
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
