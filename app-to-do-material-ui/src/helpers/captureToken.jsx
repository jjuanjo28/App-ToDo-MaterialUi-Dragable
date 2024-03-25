import axios from "axios"

export const captureTocken = async (userData) => {
    try {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `http://localhost:3000/users/auth/login/`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(userData),
      }
      const response = await axios.request(config)
     
      return response
      
    } catch (error) {
      throw error;
    }
    
  
  }