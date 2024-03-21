import React, { useState } from 'react'
import  useStore  from "../stores/index.js"

export default function TasksScreen() {
  const {tasksUser} = useStore((state=>{
    return{tasksUser:state.tasksUser}
  }))

  return (
    <div>
      aca mi tasks screen
      {tasksUser.map((task) => (
        <div key={task.id}>
        Esta es una task:
          <h1>{task.task}</h1>
        </div>
      ))}
    </div>
  )
}
