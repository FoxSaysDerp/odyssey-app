import { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AuthContext } from "../../common/context/auth-context";

import { button } from "../../common/components/Button";
import { HiPencilAlt } from "react-icons/hi";
import { MdDelete } from "react-icons/md";

const MemoryItemWrapper = styled.div`
   display: block;
   position: relative;
   overflow: hidden;
   border-radius: 16px;
`;

const MemoryImage = styled.img`
   max-width: 100%;
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
`;

const EditButton = styled(Link)`
   ${button}
   font-size: 1rem;
`;

const DeleteButton = styled(Link)`
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
   imageUrl,
   title,
   description,
   creatorId,
   createdOn,
}) => {
   const auth = useContext(AuthContext);

   return (
      <MemoryItemWrapper>
         <MemoryImage src={imageUrl} alt={title} />
         <MemoryInfo>
            <MemoryCreator>{creatorId}</MemoryCreator>
            <MemoryDescription>{description}</MemoryDescription>
            <MemoryDate>{createdOn}</MemoryDate>
         </MemoryInfo>
         {auth.userId === creatorId && (
            <ButtonContainer>
               <DeleteButton>
                  <MdDelete className="react-icon" /> <span>Delete</span>
               </DeleteButton>
               <EditButton to={`/memories/${id}`}>
                  <HiPencilAlt className="react-icon" /> <span>Edit</span>
               </EditButton>
            </ButtonContainer>
         )}
      </MemoryItemWrapper>
   );
};

export default MemoryItem;
