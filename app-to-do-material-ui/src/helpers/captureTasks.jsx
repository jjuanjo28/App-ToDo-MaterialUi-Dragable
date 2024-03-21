import axios from "axios";

export const captureTasks =(id,token)=>{
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://localhost:3000/tasks/user/${id}`,
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      };
      
      axios.request(config)
      .then((response) => {
        console.log("ACA ESTOY CON LAS TASKS en App.jsx")
        sessionStorage.setItem("myTasks",JSON.stringify(response.data))
       
      })
      .catch((error) => {
        console.log(error);
      });
      
}
export default captureTasks