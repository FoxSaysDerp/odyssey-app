import styled from "styled-components";
import { ButtonGradient } from "../../styles/Main";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const AddMemoryButtonWrapper = styled(ButtonGradient)`
   .react-icon {
      color: #fff;
      height: 1.5rem;
      width: 1.5rem;
      margin-right: 15px;
   }
`;

const AddMemoryButton = () => {
   return (
      <Link to="/memories/new">
         <AddMemoryButtonWrapper type="button">
            <BsFillPlusCircleFill className="react-icon" />
            <span>Add a Memory</span>
         </AddMemoryButtonWrapper>
      </Link>
   );
};

export default AddMemoryButton;
