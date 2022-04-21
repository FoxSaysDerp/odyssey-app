import styled from "styled-components";

import Input from "../../common/components/Input";
import { VALIDATOR_REQUIRE } from "../../util/validators";

const MemoryFormWrapper = styled.form`
   display: flex;
   height: 100vh;
   justify-content: center;
   align-items: center;
`;

const NewMemory = () => {
   return (
      <MemoryFormWrapper>
         <Input
            type="text"
            placeholder="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
         />
      </MemoryFormWrapper>
   );
};

export default NewMemory;
