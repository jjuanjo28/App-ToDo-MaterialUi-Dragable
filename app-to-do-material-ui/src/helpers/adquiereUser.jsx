import axios from "axios";

export const adquiereUser=  (idNumber,newData)=>{

  console.log("soy el idNumber y tengo una cookkie", idNumber, newData);
 


    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://localhost:3000/users/${idNumber}`,
        headers: { 
          'Authorization':  `Bearer ${newData.token}`
        }
      };
      
      axios.request(config)
      .then((response) => {
        const data = JSON.stringify(response.data)
       console.log("soy la data en adquiereUser:", data);
       sessionStorage.setItem("myData",data)
       
    })
      .catch((error) => {
        console.log(error);
      });
  }
  export default adquiereUser