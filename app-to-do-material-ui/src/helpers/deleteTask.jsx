import axios from "axios";

export const deleteTaskXX = (id) =>{
    let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `http://localhost:3000/tasks/${id}`,
        headers: {
          Authorization: `Bearer ${cookies.get("idToken")}`,
        },
      };
  
      axios
        .request(config)
        .then((response) => {
          if (response.data.message == "Prestamo Eliminado") {
            sessionStorage.setItem("deleteOk",JSON.stringify(response.data))
          }
        })
        .catch((error) => {
          console.log(error);
        });
    
}
export default deleteTaskXX