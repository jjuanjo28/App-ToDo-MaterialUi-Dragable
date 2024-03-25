import { create } from "zustand";
import axios from "axios";
import { devtools } from "zustand/middleware";
import { captureTocken } from "../helpers/captureToken";

const useStore = create(
  devtools((set, get) => ({
    isUserConnected: false,
    dataUser: [],
    tasksUser: [],
    
    setIsUserConnected: (arg) => set({ isUserConnected: arg }),

    changeStateTask: async (idTask) => {
      const { tasksUser } = get();
      const newCaptureData = await captureTocken(get().dataUser);
      const filtroTask = tasksUser.find((task) => task.id == idTask);
      let data = 1;
      if (filtroTask.completed) {
        data = 0;
      }

      let newConfig = {
        method: "put",
        maxBodyLength: Infinity,
        url: `http://localhost:3000/tasks/${idTask}`,
        headers: {
          Authorization: `Bearer ${newCaptureData.data.token}`,
        },
        data: { completed: data },
      };
      axios
        .request(newConfig)
        .then((response) => {
          if (response.data.message == "Prestamo Editado Correctamente") {
            const updatedTasksUser = tasksUser.map((task) =>
              task.id === idTask
                ? { ...task, completed: !filtroTask.completed }
                : task
            );
            set({ tasksUser: updatedTasksUser });
          }
        })
        .catch((error) => {
          throw new Error("error:", error);
        });
    },

    changePassword: async (newPassword) => {
      const newCaptureData = await captureTocken(get().dataUser);
      console.log("soy la newdata: ", newCaptureData);

      let newConfig = {
        method: "put",
        maxBodyLength: Infinity,
        url: `http://localhost:3000/users/user/${newCaptureData.data.idUser}`,
        headers: {
          Authorization: `Bearer ${newCaptureData.data.token}`,
        },
        data: newPassword,
      };

      axios
        .request(newConfig)
        .then((response) => {
          if (response.data.message == "Usuario Editado Correctamente") {
            const dataToSave = get().dataUser;

            if (dataToSave.password != newPassword.password) {
              dataToSave.password = newPassword.password;

              set({ dataUser: dataToSave });
            }
          }
        })
        .catch((error) => {
          throw new Error("error:", error);
        });
    },

    editUser: async (dataUser) => {
      const newCaptureData = await captureTocken(get().dataUser);
      console.log("soy el dataUser:", dataUser);
      let newConfig = {
        method: "put",
        maxBodyLength: Infinity,
        url: `http://localhost:3000/users/user/${newCaptureData.data.idUser}`,
        headers: {
          Authorization: `Bearer ${newCaptureData.data.token}`,
        },
        data: dataUser,
      };
      axios
        .request(newConfig)
        .then((response) => {
          console.log("soy la response:", response);
          if (response.data.message == "Usuario Editado Correctamente") {
            const dataToSave = get().dataUser;

            if (dataUser.name != "") {
              dataToSave.name = dataUser.name;
            }
            if (dataUser.email != "") {
              dataToSave.email = dataUser.email;
            }

            set({ dataUser: dataToSave });
          }
        })
        .catch((error) => {
          console.log(error);
          alert(JSON.stringify(error.response.data));
        });
    },

    setUserZustand: async (dataUser) => {
      const newCaptureData = await captureTocken(dataUser);
      let newConfig = {
        method: "get",
        maxBodyLength: Infinity,
        url: `http://localhost:3000/users/${newCaptureData.data.idUser}`,
        headers: {
          Authorization: `Bearer ${newCaptureData.data.token}`,
        },
      };
      axios
        .request(newConfig)
        .then((response) => {
          console.log("soy dataUser:",response);
          set({ dataUser: response.data });
          set({ isUserConnected: true });

          let configForTasks = {
            method: "get",
            maxBodyLength: Infinity,
            url: `http://localhost:3000/tasks/user/${response.data.idPersona}`,
            headers: {
             
              Authorization: `Bearer ${newCaptureData.data.token}`,
            },
          };
          axios
            .request(configForTasks)
            .then((response) => {
              console.log("soy la response de tasks:", response);
              if (response.data.length != 0) {
                set({ tasksUser: response.data });
                set({ isUserConnected: true });
              }
            })
            .catch((error) => {
              set({ isUserConnected: false });
              alert("Error: Ingrese su usuario nuevamente");
            });
        })
        .catch((error) => {
          set({ isUserConnected: false });
          alert("Error: Ingrese su usuario nuevamente");
        });
    },

    deleteTask: async (taskId) => {
      const { tasksUser } = get();
      const newDataUser = await captureTocken(get().dataUser);

      let newConfig = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `http://localhost:3000/tasks/${taskId}`,
        headers: {
          Authorization: `Bearer ${newDataUser.data.token}`,
        },
      };

      axios
        .request(newConfig)
        .then((response) => {
          if (response.data.message == "Prestamo Eliminado") {
            const nuevaLista = tasksUser.filter((task) => task.id != taskId);
            set({ tasksUser: nuevaLista });
          }
        })
        .catch((error) => {
          console.log("error:", error);
        });
    },
    createNewTask: async (newTask) => {
      const newCaptureData = await captureTocken(get().dataUser);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:3000/tasks/",
        headers: {
          Authorization: `Bearer ${newCaptureData.data.token}`,
        },
        data: newTask,
      };
      axios
        .request(config)
        .then((response) => {
          console.log("soy la response", response);
          if (response.data.message == "Prestamo Creado Correctamente") {
            let configForTasks = {
              method: "get",
              maxBodyLength: Infinity,
              url: `http://localhost:3000/tasks/user/${newCaptureData.data.idUser}`,
              headers: {
                Authorization: `Bearer ${newCaptureData.data.token}`,
              },
            };
            axios
              .request(configForTasks)
              .then((response) => {
                console.log("soy la response de tasks:", response);
                if (response.data.length != 0) {
              set({ tasksUser: response.data });          
                }
              })

              .catch((error) => {
                console.log("error:", error);
              });
          }
        })
        .catch((error) => {
          console.log("error:", error);
        });
    },
    logOut: () => {
      set({ tasksUser: [] }),
        set({ dataUser: [] }),
        set({ isUserConnected: false });
    },
  }))
);

export default useStore;
