import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../util/validators";
import { useForm } from "../../common/hooks/useForm";

import { MemoryFormWrapper } from "./NewMemory";
import Input from "../../common/components/Input";
import { button, buttonGradient } from "../../common/components/Button";

const DUMMY_MEMORIES = [
   {
      id: "m1",
      title: "Test title",
      description:
         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      imageUrl:
         "https://images.unsplash.com/photo-1650464187828-d380b8edbc0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
      creatorId: "foxsaysderp",
      createdOn: moment().format("LL"),
   },
   {
      id: "m2",
      title: "Test title 2 Electric Boogaloo",
      description:
         "Filler text kekw Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      imageUrl:
         "https://images.unsplash.com/photo-1650464232600-68f45ea392ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      creatorId: "hugephotographer2022",
      createdOn: moment().format("LL"),
   },
];

const MemoryNotFound = styled.div`
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

const SubmitMemoryButton = styled.button`
   ${button}
   ${buttonGradient}
`;

const UpdateMemory = () => {
   const [isLoading, setIsLoading] = useState(true);
   const memoryId = useParams().memoryId;

   const identifiedMemory = DUMMY_MEMORIES.find((m) => m.id === memoryId);

   const { formState, inputHandler, setFormData } = useForm(
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

   useEffect(() => {
      if (identifiedMemory) {
         setFormData(
            {
               title: {
                  value: identifiedMemory.title,
                  isValid: true,
               },
               description: {
                  value: identifiedMemory.description,
                  isValid: true,
               },
            },
            true
         );
      }
      setIsLoading(false);
   }, [setFormData, identifiedMemory]);

   if (!identifiedMemory) {
      return (
         <MemoryNotFound>
            <span>Could not find Memory, sorry!</span>
         </MemoryNotFound>
      );
   }

   if (isLoading) {
      return <div>Loading...</div>;
   }

   return (
      <MemoryFormWrapper>
         <Input
            id="title"
            type="text"
            placeholder="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValid={formState.inputs.title.isValid}
            initialValue={formState.inputs.title.value}
         />
         <Input
            id="description"
            element="textarea"
            placeholder="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (at least 5 character)."
            onInput={inputHandler}
            initialValid={formState.inputs.description.isValid}
            initialValue={formState.inputs.description.value}
         />
         <SubmitMemoryButton type="submit" disabled={!formState.isValid}>
            Update Memory
         </SubmitMemoryButton>
      </MemoryFormWrapper>
   );
};

export default UpdateMemory;
