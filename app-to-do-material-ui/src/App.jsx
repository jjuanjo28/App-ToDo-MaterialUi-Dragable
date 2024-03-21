import { Button, Container, Typography,Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import mainStore from "./stores/index.js"
import React, {useState,useEffect} from "react";
import UserScreen from "./screens/UserScreen";
import TasksScreen from "./screens/TasksScreen";
import Cookies from "universal-cookie"
import GeneralScreen from "./screens/GeneralScreen";
import NavBar from "./components/NavBar";
import Stack from '@mui/material/Stack';
import adquiereUser from './helpers/adquiereUser.jsx';
import captureTasks from './helpers/captureTasks.jsx';

export default function App() {
  const { setUserZustand, setTasksZustand, logOut } = mainStore()
  const cookies = new Cookies
  const [user, setUser] = useState([])

  const [logged, setLoged] = useState(false)
  const [idNumber, setIdNumber] = useState("")
  
  useEffect(() => {
    if(logged){
     console.log("estoy logeado");
   
  } else {
    logOut()
    setUserZustand([])
    setLoged(false)
  }
}, [logged])

  return (
<Router>
  <Stack spacing={6}>
      <NavBar logged={logged} setLoged={setLoged} />
  </Stack>
     <Routes>
    <Route exact path="/" element={<GeneralScreen logged={logged}/>}/>
    <Route path="/user" element={<UserScreen setUser={setUser} setIdNumber={setIdNumber} setLoged={setLoged} logged={logged}/>}/>
   </Routes>

</Router>
    
  );
}
