import { create } from "zustand";
import axios from "axios";
import { devtools } from "zustand/middleware";

const useStore = create(
  devtools((set, get) => ({
    isUserConnected: false,
    dataUser: [],
    tasksUser: [],

    setIsUserConnected: (arg) => set({ isUserConnected: arg }),

    
    setUserZustand: (dataUser) => {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:3000/users/auth/login/",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(dataUser),
      };

      axios.request(config).then((response) => {
      
        const newdata = response.data;


        let newConfig = {
          method: "get",
          maxBodyLength: Infinity,
          url: `http://localhost:3000/users/${newdata.idUser}`,
          headers: {
            Authorization: `Bearer ${newdata.token}`,
          },
        };

        axios.request(newConfig).then((response) => {
         
          set({ dataUser: response.data });
          set({ isUserConnected: true })


         
          
          let configForTasks = {
            method: "get",
            maxBodyLength: Infinity,
            url: `http://localhost:3000/tasks/user/${response.data.idPersona}`,
            headers: {
              Authorization: `Bearer ${newdata.token}`,
            },
          };
          axios.request(configForTasks).then((response) => {
            if (response.data.length != 0) {
              set({ tasksUser: response.data });
              set({ isUserConnected: true })
          }
          
          })
          .catch((error) => {
            set({ isUserConnected: false })
            alert("Error: Ingrese su usuario nuevamente")
         })

 
          
       
        })
        .catch((error) => {
          set({ isUserConnected: false })
          alert("Error: Ingrese su usuario nuevamente")
       })
     
     
      })
      .catch((error) => {
        set({ isUserConnected: false })
        alert("Error: Ingrese su usuario nuevamente")
     })
      
    },

    deleteTask: (taskId) => {
      console.log("soy la task a borrar:", taskId);
      const { tasksUser } = get();
      const nuevaLista = tasksUser.filter((task) => task.id != taskId);
      set({ tasksUser: nuevaLista });
    },
    createTask:(newTask) =>{
     console.log("soy la NewTask:",newTask);
    },
    logOut: () => {
      set({ tasksUser: [] }),
        set({ dataUser: [] }),
        set({ isUserConnected: false });
    },
  }))
);

export default useStore;
