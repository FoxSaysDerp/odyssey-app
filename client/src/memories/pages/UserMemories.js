import { useState, useEffect } from "react";
import MemoryList from "../components/MemoryList";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../common/hooks/useHttpClient";
import Spinner from "../../common/components/Spinner";

import { toast } from "react-toastify";

const UserMemories = () => {
   const [memoriesByUserId, setMemoriesByUserId] = useState([]);

   const { sendRequest, error, isLoading } = useHttpClient();

   const userId = useParams().userId;

   useEffect(() => {
      const fetchUserMemories = async () => {
         try {
            const responseData = await sendRequest(
               `http://localhost:5000/api/memories/user/${userId}`
            );
            setMemoriesByUserId(responseData.memories);
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
      fetchUserMemories();
   }, [sendRequest]);

   if (isLoading) {
      return <Spinner asOverlay />;
   }
   return <MemoryList items={memoriesByUserId} />;
};

export default UserMemories;
