import { useCallback, useReducer } from "react";
import styled from "styled-components";

import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../util/validators";
import Input from "../../common/components/Input";
import { ButtonGradient } from "../../styles/Main";

export const MemoryFormWrapper = styled.form`
   display: flex;
   height: 100vh;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   row-gap: 30px;
`;

const formReducer = (state, action) => {
   switch (action.type) {
      case "INPUT_CHANGE": {
         let formIsValid = true;
         for (let inputId in state.inputs) {
            if (inputId === action.inputId) {
               formIsValid = formIsValid && action.isValid;
            } else {
               formIsValid = formIsValid && state.inputs[inputId].isValid;
            }
         }
         return {
            ...state,
            inputs: {
               ...state.inputs,
               [action.inputId]: {
                  value: action.value,
                  isValid: action.isValid,
               },
            },
            isValid: formIsValid,
         };
      }
      default:
         return state;
   }
};

const NewMemory = () => {
   const [formState, dispatch] = useReducer(formReducer, {
      inputs: {
         title: {
            value: "",
            isValid: false,
         },
         description: {
            value: "",
            isValid: false,
         },
      },
      isValid: false,
   });

   const inputHandler = useCallback((id, value, isValid) => {
      dispatch({
         type: "INPUT_CHANGE",
         value: value,
         isValid: isValid,
         inputId: id,
      });
      console.log(formState);
   }, []);

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
         <ButtonGradient type="submit" disabled={!formState.isValid}>
            Add Memory
         </ButtonGradient>
      </MemoryFormWrapper>
   );
};

export default NewMemory;
