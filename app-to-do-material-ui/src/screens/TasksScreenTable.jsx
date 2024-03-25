import React from "react";
import useStore from "../stores/index.js";
import { Button, IconButton, Box, Table, Typography } from "@mui/material";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AssignmentTurnedIn, Delete, NotificationsActiveRounded } from "@mui/icons-material";
import mainStore from "../stores/index.js"
import { useNavigate } from "react-router-dom";
export default function TasksScreenTable() {
  const {deleteTask, changeStateTask} = mainStore()
  const { tasksUser } = useStore((state) => {
    return { tasksUser: state.tasksUser };
  });
  const navigate = useNavigate()
 console.log("soy las taskUser",tasksUser);

  return (
    

    <TableContainer component={Paper} sx={{margin:"0 30px",maxWidth: 'calc(100% - 60px)' }} >
    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell>Tasks</TableCell>
          <TableCell align="right">Created at</TableCell>
          <TableCell align="right">Limit date</TableCell>
          <TableCell align="right">Type</TableCell>
          <TableCell align="right">Completed</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tasksUser.map((task) => (
          <TableRow
            key={task.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
             {task.task}
            <IconButton sx={{alignItems:"center"}}>
            
            </IconButton>

            </TableCell>
            <TableCell align="right">{task.created_at.slice(0,10)}</TableCell>
            <TableCell align="right">{task.limit_date}</TableCell>
            <TableCell align="right">{task.type}</TableCell>
            <TableCell align="right">{task.completed? <h2>Tarea completa</h2>:<h2>Tarea pendiente</h2>}</TableCell>
            <TableCell align="right">
            <IconButton sx={{alignItems:"center"}} onClick={()=>changeStateTask(task.id)}>
            <Typography>Cambie el estado</Typography>
            <AssignmentTurnedIn color="secondary" sx={{fontSize:"40px"}} />
            </IconButton>
            <IconButton sx={{alignItems:"center"}} onClick={()=>deleteTask(task.id)}>
            <Typography>Eline la tarea</Typography>
            <Delete color="error" sx={{fontSize:"40px"}} />
            </IconButton>

            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <Box sx={{display:"flex", justifyContent:"flex-end"}}>

    <Button
            sx={{margin:"10px"}}
            color="primary"
            variant="contained"
            size="small"
           onClick={() => navigate("/")}
          >
            Go Home
          </Button>
    </Box>
  </TableContainer>
  );
}
