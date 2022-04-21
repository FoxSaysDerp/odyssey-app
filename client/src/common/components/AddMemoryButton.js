import styled from "styled-components";
import { Button } from "../../styles/Main";
import { BsFillPlusCircleFill } from "react-icons/bs";

const AddMemoryButtonWrapper = styled(Button)`
   .react-icon {
      color: #fff;
      height: 1.5rem;
      width: 1.5rem;
      margin-right: 15px;
   }
`;

const AddMemoryButton = () => {
   return (
      <AddMemoryButtonWrapper>
         <BsFillPlusCircleFill className="react-icon" />
         <span>Add a Memory</span>
      </AddMemoryButtonWrapper>
   );
};

export default AddMemoryButton;
