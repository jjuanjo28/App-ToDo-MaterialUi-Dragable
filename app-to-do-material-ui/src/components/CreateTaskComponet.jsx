import {
    Button,
    Container,
    ListItemIcon,
    TextField,
    FormControlLabel,
    Checkbox,
    Box,
  
  } from "@mui/material";
  import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
  import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
  import { DatePicker } from "@mui/x-date-pickers/DatePicker";
  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import useStore from "../stores/index.js";
  import Card from "@mui/material/Card";
  import CardActions from "@mui/material/CardActions";
  import CardContent from "@mui/material/CardContent";
  import Typography from "@mui/material/Typography";
  import { FiberNew } from "@mui/icons-material";
  import mainStore from "../stores/index.js";
  import dayjs from 'dayjs';
  
  export default function CreateTaskComponent() {
    const { createNewTask } = mainStore();
    const [user, setUser] = useState(useStore((state) => state.dataUser));
    const [formData, setFormData] = useState({
      task: "",
      type: "Normal",
      limit_date: null,
    });
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleDateChange = (date) => {
      console.log("soy el date:",date);
      setFormData({
        ...formData,
        limit_date: date,
      });
    };
    
    const formatDate = (date) => {
      // Formatea la fecha en el formato "YYYY-MM-DD"
      return dayjs(date).format('YYYY-MM-DD');
    };
  
    function createTask(event) {
      event.preventDefault();
  
      const newTask = {
        task: event.target.new_task.value,
        completed: 0,
        type: formData.type,
        created_at: formatDate(new Date()),
        limit_date: formatDate(formData.limit_date),
        personaId: user.idPersona,
      };
  
      createNewTask(newTask)
      navigate("/")
    }
  
    const navigate = useNavigate();
    return (
      <Container
        maxWidth="sm"
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      >
        <Typography variant="h5">Create New Task</Typography>
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
            <FiberNew
              color="info"
              sx={{ fontSize: "120px", marginTop: "15px" }}
            />
          </ListItemIcon>
          <CardContent>
            <form onSubmit={createTask}>
              <Box>
                <TextField
                  size="small"
                  id="new_task"
                  name="new_task"
                  label={`Your new task`}
                  sx={{ margin: "10px" }}
                />
              </Box>
  
                <Typography variant="h6" sx={{ color: "black" }}>
                  Tipo de tarea:
                </Typography>
  
                <Box>
                <FormControlLabel
                  control={<Checkbox id="Normal" name="type" value="Normal" />}
                  label="Normal"
                  checked={formData.type === 'Normal'}
                  onChange={handleChange}
                />
                <FormControlLabel
                  control={<Checkbox id="Important" name="type" value="Important" />}
                  label="Important"
                  checked={formData.type === 'Important'}
                  onChange={handleChange}
                />
              </Box>
              <Typography variant="h6" sx={{ color: "black", marginTop: "10px" }}>Fecha límite:</Typography>
  
  
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                   id="new_limit_date"
                   name="limit_date"
                   value={formData.limit_date}
                   onChange={handleDateChange} 
                  />
                </LocalizationProvider>
          
  
              <Button
                sx={{ marginTop: "10px" }}
                size="small"
                color="secondary"
                variant="contained"
                type="submit"
              >
                Create your new Task
              </Button>
              <Button
                sx={{ marginLeft: "10px", marginTop: "10px" }}
                color="primary"
                variant="contained"
                size="small"
                onClick={() => navigate("/")}
              >
                Go Home
              </Button>
            </form>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Container>
    );
  }
  