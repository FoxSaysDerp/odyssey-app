import styled from "styled-components";
import { Button } from "../../styles/Main";
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

const EditButton = styled(Button)`
   font-size: 1rem;
`;

const DeleteButton = styled(Button)`
   font-size: 1rem;
`;
const ButtonContainer = styled.div`
   position: absolute;
   top: 15px;
   right: 15px;
   display: flex;
   column-gap: 15px;
`;

const MemoryItem = ({ imageUrl, title, description, creatorId, createdOn }) => {
   return (
      <MemoryItemWrapper>
         <MemoryImage src={imageUrl} alt={title} />
         <MemoryInfo>
            <MemoryCreator>{creatorId}</MemoryCreator>
            <MemoryDescription>{description}</MemoryDescription>
            <MemoryDate>{createdOn}</MemoryDate>
         </MemoryInfo>
         <ButtonContainer>
            <DeleteButton>
               <MdDelete className="react-icon" /> <span>Delete</span>
            </DeleteButton>
            <EditButton>
               <HiPencilAlt className="react-icon" /> <span>Edit</span>
            </EditButton>
         </ButtonContainer>
      </MemoryItemWrapper>
   );
};

export default MemoryItem;
