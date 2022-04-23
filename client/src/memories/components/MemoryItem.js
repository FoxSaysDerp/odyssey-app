import { useState, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";

import { AuthContext } from "../../common/context/auth-context";
import { useHttpClient } from "../../common/hooks/useHttpClient";

import { button } from "../../common/components/Button";
import Spinner from "../../common/components/Spinner";
import { HiPencilAlt } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { FaQuestion } from "react-icons/fa";

const MemoryItemWrapper = styled.div`
   position: relative;
   margin: 15px 0;
   width: fit-content;
`;

const MemoryImage = styled.img`
   margin-bottom: 15px;
   max-width: 100%;
   border-radius: 16px;
`;

const MemoryInfo = styled.div`
   display: block;
`;

const MemoryCreator = styled.span`
   display: inline-block;
   font-weight: 700;
   margin-right: 5px;
`;

const MemoryDescription = styled.span`
   display: inline;
`;

const MemoryDate = styled.div`
   position: absolute;
   top: 15px;
   left: 15px;
   color: #fff;
   text-shadow: 0px 0px 5px #000;
`;

const EditButton = styled(Link)`
   ${button}
   font-size: 1rem;
`;

const DeleteButton = styled.button`
   ${button}
   font-size: 1rem;
`;
const ButtonContainer = styled.div`
   position: absolute;
   top: 15px;
   right: 15px;
   display: flex;
   column-gap: 15px;
`;

const MemoryItem = ({
   id,
   image,
   title,
   description,
   creatorId,
   createdOn,
   onDelete,
}) => {
   const [deletion, setDeletion] = useState({
      step: 0,
      buttonContent: "Delete",
   });

   const auth = useContext(AuthContext);

   const { isLoading, error, sendRequest } = useHttpClient();

   const deleteMemory = async () => {
      try {
         await sendRequest(
            `http://localhost:5000/api/memories/${id}`,
            "DELETE"
         );
         toast.info("Successfully deleted a memory.", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
         });
      } catch (err) {
         toast.error(`${error || "Something went wrong, please try again"}`, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
         });
      }
   };

   const deletionHandler = () => {
      if (deletion.step === 0) {
         setDeletion({ step: 1, buttonContent: "Are you sure?" });
      }
      if (deletion.step === 1) {
         deleteMemory();
         onDelete(id);
         setDeletion({ step: 0, buttonContent: "Delete" });
      }
   };

   return (
      <MemoryItemWrapper>
         {isLoading && <Spinner asOverlay />}
         <MemoryImage src={image} alt={title} />
         <MemoryInfo>
            <MemoryCreator>{creatorId}</MemoryCreator>
            <MemoryDescription>{description}</MemoryDescription>
            <MemoryDate>{moment(createdOn).format("LLL")}</MemoryDate>
         </MemoryInfo>
         {auth.userId === creatorId && (
            <ButtonContainer>
               <EditButton to={`/memories/${id}`}>
                  <HiPencilAlt className="react-icon" /> <span>Edit</span>
               </EditButton>
               <DeleteButton type="button" onClick={deletionHandler}>
                  {deletion.step !== 0 ? (
                     <FaQuestion className="react-icon" />
                  ) : (
                     <MdDelete className="react-icon" />
                  )}{" "}
                  <span>{deletion.buttonContent}</span>
               </DeleteButton>
            </ButtonContainer>
         )}
      </MemoryItemWrapper>
   );
};

export default MemoryItem;
