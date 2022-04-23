import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../common/context/auth-context";
import styled from "styled-components";
import MemoryList from "../components/MemoryList";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../common/hooks/useHttpClient";
import Spinner from "../../common/components/Spinner";

import { toast } from "react-toastify";

const UserMemoriesHeader = styled.h2`
   font-size: 1.75rem;
   text-align: center;
   > span {
      font-weight: 700;
   }
`;

const UserMemories = () => {
   const [memoriesByUserId, setMemoriesByUserId] = useState([]);

   const auth = useContext(AuthContext);

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

   const memoryDeletionHandler = (deletedMemoryId) => {
      setMemoriesByUserId((prevMemories) =>
         prevMemories.filter((memory) => memory._id !== deletedMemoryId)
      );
   };

   if (isLoading) {
      return <Spinner asOverlay />;
   }
   return (
      !isLoading &&
      memoriesByUserId && (
         <div>
            {userId !== auth.userId && (
               <UserMemoriesHeader>
                  <span>{`${userId}'s`}</span> memories
               </UserMemoriesHeader>
            )}
            {userId === auth.userId && (
               <UserMemoriesHeader>
                  <span>Your</span> memories
               </UserMemoriesHeader>
            )}
            <MemoryList
               items={memoriesByUserId}
               onDeleteMemory={memoryDeletionHandler}
            />
         </div>
      )
   );
};

export default UserMemories;
