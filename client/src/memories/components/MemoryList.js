import styled from "styled-components";
import MemoryItem from "./MemoryItem";

const MemoriesNotFound = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
`;

const MemoryListWrapper = styled.ul`
   display: flex;
`;

const MemoryList = ({ items }) => {
   if (items.length === 0) {
      return (
         <MemoriesNotFound>
            No Memories has been found, maybe create one?
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
