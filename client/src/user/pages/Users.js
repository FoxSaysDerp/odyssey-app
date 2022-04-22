import { useState, useEffect } from "react";

import UserList from "../components/UserList";
import Spinner from "../../common/components/Spinner";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Users = () => {
   const [isLoading, setIsLoading] = useState(true);
   const [users, setUsers] = useState([]);

   useEffect(() => {
      const sendRequest = async () => {
         try {
            const response = await fetch("http://localhost:5000/api/users");
            const responseData = await response.json();

            if (!response.ok) {
               throw new Error(responseData.message);
            }

            setUsers(responseData.users);
            setIsLoading(false);
         } catch (err) {
            setIsLoading(false);
            toast.error(
               `${err.message || "Something went wrong, please try again"}`,
               {
                  position: "bottom-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: false,
                  progress: 0,
               }
            );
         }
      };
      sendRequest();
   }, []);

   if (isLoading) {
      return <Spinner asOverlay />;
   }
   return (
      <>
         <UserList users={users} />
         <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover
         />
      </>
   );
};

export default Users;
