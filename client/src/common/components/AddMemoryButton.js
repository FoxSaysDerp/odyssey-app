import styled from "styled-components";
import { button, buttonGradient } from "../../common/components/Button";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const AddMemoryButtonWrapper = styled(Link)`
   ${button}
   ${buttonGradient}
   .react-icon {
      color: #fff;
      height: 1.5rem;
      width: 1.5rem;
      margin-right: 15px;
   }
`;

const AddMemoryButton = () => {
   return (
      <AddMemoryButtonWrapper to="/memories/new">
         <BsFillPlusCircleFill className="react-icon" />
         <span>Add a Memory</span>
      </AddMemoryButtonWrapper>
   );
};

export default AddMemoryButton;
