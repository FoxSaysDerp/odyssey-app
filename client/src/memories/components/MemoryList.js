import styled from "styled-components";
import MemoryItem from "./MemoryItem";
import AddMemoryButton from "../../common/components/AddMemoryButton";

const MemoriesNotFound = styled.div`
   height: 100vh;
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   row-gap: 30px;
   > span {
      font-size: 2rem;
   }
`;

const MemoryListWrapper = styled.ul`
   display: flex;
   flex-direction: column;
   row-gap: 30px;
`;

const MemoryList = ({ items }) => {
   if (items.length === 0) {
      return (
         <MemoriesNotFound>
            <span>No Memories has been found, maybe create one?</span>
            <AddMemoryButton />
         </MemoriesNotFound>
      );
   }

   return (
      <MemoryListWrapper>
         {items.map((item, index) => (
            <MemoryItem
               key={index}
               id={item.id}
               imageUrl={item.imageUrl}
               title={item.title}
               description={item.description}
               creatorId={item.creator}
               createdOn={item.createdOn}
            />
         ))}
      </MemoryListWrapper>
   );
};

export default MemoryList;
