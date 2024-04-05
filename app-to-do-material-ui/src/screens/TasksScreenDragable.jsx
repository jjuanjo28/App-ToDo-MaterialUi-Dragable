import React, { useState } from 'react'
import  useStore  from "../stores/index.js"
import { Container, Card, CardContent, Typography, CardActions, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function TasksScreenDragable() {
  const {tasksUser} = useStore((state=>{
    return{tasksUser:state.tasksUser}
  }))
  const {deleteTask} = useStore()
  const [id, setId] = useState("");
  const navigate = useNavigate()



  const handleDrop = (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("task-id");
    setId(taskId);
    deleteTask(taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };




  return (
    <Container style={{display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",}}>


     <div style={{
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  maxWidth: "calc(100% - 200px)", // Resta el ancho del contenedor del trash
}} >

    {tasksUser.map((task) => (
  
       <Card
       key={task.id}
            className="task-item"
       onDragStart={(e) => {
              e.dataTransfer.setData("task-id", task.id);
            }}
       sx={{
        cursor:"pointer",
         maxWidth: 200,
         margin: "20px",
         border: "solid 1px grey",
         display: "flex",
         flexDirection: "column",
         alignItems: "center",
         textAlign: "center",
       }}
       
     >
       
         <h1>{task.task}</h1>
     
         <CardContent>
        <Typography gutterBottom  component="div">
         Created at: {task.created_at.slice(0,10)}
        </Typography>
        <Typography  gutterBottom  component="div">
          Limit date:{task.limit_date}
        </Typography>
        <Typography  gutterBottom variant="h6" component="div">
        {task.type}
        </Typography>
        <Typography  gutterBottom variant="h6" component="div">
         State Task :{task.completed? <h4>Tarea completa</h4>:<h4>Tarea pendiente</h4>}
        </Typography>
         
      </CardContent>
      <CardActions>

        <Button size="small" color="secondary" variant="contained" onClick={() => navigate("/editUserCard")}>Edit Task</Button>
      <Button color="primary" variant="contained" size="small" onClick={() => navigate("/")}>
        Go Home
      </Button>
      </CardActions>
     </Card>
    
     ))}
     </div>

     <div style={{
  position: "fixed", // Posición fija para que flote sobre las tareas
  top: "50%", // Colocar el contenedor en el centro verticalmente
  right: "20px", // Colocar el contenedor en el borde derecho
  transform: "translateY(-50%)", // Centrar verticalmente el contenedor
  backgroundColor: "lightgray",
  padding: "20px",
}} className="trash" onDrop={handleDrop} onDragOver={handleDragOver}>
          <h2>Trash here!!!</h2>
     </div>     
    </Container>
  )
}
