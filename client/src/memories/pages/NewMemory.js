import { useContext } from "react";
import { AuthContext } from "../../common/context/auth-context";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import { useForm } from "../../common/hooks/useForm";
import { useHttpClient } from "../../common/hooks/useHttpClient";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../util/validators";

import Spinner from "../../common/components/Spinner";
import Input from "../../common/components/Input";
import { buttonGradient } from "../../common/components/Button";
import ImageUpload from "../../common/components/ImageUpload";

const MemoryFormContainer = styled.div`
   display: flex;
   width: 100%;
   height: 100vh;
   justify-content: center;
   align-items: center;
`;

export const MemoryFormWrapper = styled.form`
   display: flex;
   height: 100vh;
   width: 100%;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   row-gap: 30px;
`;

const SubmitMemoryButton = styled.button`
   ${buttonGradient}
`;

const NewMemory = () => {
   const auth = useContext(AuthContext);

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
         image: {
            value: null,
            isValid: false,
         },
      },
      false
   );

   const { isLoading, sendRequest, error } = useHttpClient();

   const history = useHistory();

   const memorySubmitHandler = async (e) => {
      e.preventDefault();
      try {
         const formData = new FormData();
         formData.append("title", formState.inputs.title.value);
         formData.append("description", formState.inputs.description.value);
         formData.append("image", formState.inputs.image.value);

         await sendRequest(
            "http://localhost:5000/api/memories",
            "POST",
            {
               Authorization: `Bearer ${auth.token}`,
            },
            formData
         );
         toast.success("Successfully created a Memory!", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
         });
         history.push("/");
      } catch (err) {
         toast.error(`${error || "Something went wrong, please try again"}`, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
         });
      }
   };

   return (
      <MemoryFormContainer>
         <MemoryFormWrapper onSubmit={memorySubmitHandler}>
            <h2>Creating a Memory</h2>
            {isLoading && <Spinner asOverlay />}
            <ImageUpload
               id="image"
               onInput={inputHandler}
               errorText="Please provide an image."
            />
            <Input
               id="description"
               element="textarea"
               label="Description"
               validators={[VALIDATOR_MINLENGTH(5)]}
               errorText="Please enter a valid description (at least 5 character)."
               onInput={inputHandler}
            />
            <Input
               id="title"
               type="text"
               label="Title"
               validators={[VALIDATOR_REQUIRE()]}
               errorText="Please enter a valid title."
               onInput={inputHandler}
            />
            <SubmitMemoryButton type="submit" disabled={!formState.isValid}>
               Add Memory
            </SubmitMemoryButton>
         </MemoryFormWrapper>
      </MemoryFormContainer>
   );
};

export default NewMemory;
