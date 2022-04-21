import { useCallback, useReducer } from "react";
import styled from "styled-components";

import { useForm } from "../../common/hooks/useForm";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../util/validators";

import Input from "../../common/components/Input";
import { button, buttonGradient } from "../../common/components/Button";

export const MemoryFormWrapper = styled.form`
   display: flex;
   height: 100vh;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   row-gap: 30px;
`;

const SubmitMemoryButton = styled.button`
   ${button}
   ${buttonGradient}
`;

const NewMemory = () => {
   const { formState, inputHandler } = useForm(
      {
         title: {
            value: "",
            isValid: false,
         },
         description: {
            value: "",
            isValid: false,
         },
      },
      false
   );

   const memorySubmitHandler = (e) => {
      e.preventDefault();
      console.log(formState.inputs);
   };

   return (
      <MemoryFormWrapper onSubmit={memorySubmitHandler}>
         <Input
            id="title"
            type="text"
            placeholder="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
         />
         <Input
            id="description"
            element="textarea"
            placeholder="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (at least 5 character)."
            onInput={inputHandler}
         />
         <SubmitMemoryButton type="submit" disabled={!formState.isValid}>
            Add Memory
         </SubmitMemoryButton>
      </MemoryFormWrapper>
   );
};

export default NewMemory;
