import React, { useState } from 'react'
import  useStore  from "../stores/index.js"
import { Container, Card } from '@mui/material'

export default function TasksScreenDragable() {
  const {tasksUser} = useStore((state=>{
    return{tasksUser:state.tasksUser}
  }))

  return (
    <Container>
    <h2>Esta es mi lista dragable</h2>
    {tasksUser.map((task) => (
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
         key={task.id}
     >
       
         <h1>{task.task}</h1>
     

     </Card>
     ))}
  
    </Container>
  )
}
