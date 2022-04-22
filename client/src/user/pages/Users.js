import { useState, useEffect } from "react";
import { useHttpClient } from "../../common/hooks/useHttpClient";

import UserList from "../components/UserList";
import Spinner from "../../common/components/Spinner";

import { toast } from "react-toastify";

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
                  position: "bottom-right",
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
      </>
   );
};

export default Users;
