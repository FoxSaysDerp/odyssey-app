import { useState, useEffect } from "react";

import { toast } from "react-toastify";
import { useHttpClient } from "../../common/hooks/useHttpClient";

import MemoryList from "../components/MemoryList";
import Spinner from "../../common/components/Spinner";

const AllMemories = () => {
   const [memories, setMemories] = useState([]);

   const { sendRequest, error, isLoading } = useHttpClient();

   useEffect(() => {
      const fetchUserMemories = async () => {
         try {
            const responseData = await sendRequest(
               "http://localhost:5000/api/memories/all"
            );
            setMemories(responseData.memories.reverse());
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
      setMemories((prevMemories) =>
         prevMemories.filter((memory) => memory._id !== deletedMemoryId)
      );
   };

   if (isLoading) {
      return <Spinner asOverlay />;
   }
   return (
      !isLoading &&
      memories && (
         <MemoryList items={memories} onDeleteMemory={memoryDeletionHandler} />
      )
   );
};

export default AllMemories;
