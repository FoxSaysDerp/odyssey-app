import { useState, useEffect } from "react";
import { useHttpClient } from "../../common/hooks/useHttpClient";

import UserList from "../components/UserList";
import Spinner from "../../common/components/Spinner";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Users = () => {
   const { isLoading, error, sendRequest } = useHttpClient();
   const [users, setUsers] = useState([]);

   useEffect(() => {
      const fetchUsers = async () => {
         try {
            const responseData = await sendRequest(
               "http://localhost:5000/api/users"
            );

            setUsers(responseData.users);
         } catch (err) {
            toast.error(
               `${error || "Something went wrong, please try again"}`,
               {
                  position: "bottom-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: false,
                  progress: 0,
               }
            );
         }
      };
      fetchUsers();
   }, [sendRequest]);

   if (isLoading) {
      return <Spinner asOverlay />;
   }
   return (
      <>
         <UserList users={users} />
         <ToastContainer
            position="bottom-right"
            autoClose={2000}
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
