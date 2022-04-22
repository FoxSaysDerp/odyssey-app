import { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import { AuthContext } from "../../common/context/auth-context";

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../util/validators";
import { useForm } from "../../common/hooks/useForm";
import { useHttpClient } from "../../common/hooks/useHttpClient";

import { MemoryFormWrapper } from "./NewMemory";
import Spinner from "../../common/components/Spinner";
import Input from "../../common/components/Input";
import { buttonGradient } from "../../common/components/Button";

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
   ${buttonGradient}
`;

const UpdateMemory = () => {
   const [loadedMemory, setLoadedMemory] = useState();

   const auth = useContext(AuthContext);

   const memoryId = useParams().memoryId;
   const history = useHistory();

   const { isLoading, error, sendRequest } = useHttpClient();

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
      const fetchMemoryById = async () => {
         try {
            const responseData = await sendRequest(
               `http://localhost:5000/api/memories/${memoryId}`
            );
            setLoadedMemory(responseData.memory);
            setFormData(
               {
                  title: {
                     value: responseData.memory.title,
                     isValid: true,
                  },
                  description: {
                     value: responseData.memory.description,
                     isValid: true,
                  },
               },
               true
            );
         } catch (err) {
            toast.error(
               `${error || "Something went wrong, please try again"}`,
               {
                  position: "bottom-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: false,
                  progress: 0,
               }
            );
         }
      };
      fetchMemoryById();
   }, []);

   const memoryUpdateSubmitHandler = async (e) => {
      e.preventDefault();
      try {
         await sendRequest(
            `http://localhost:5000/api/memories/${memoryId}`,
            "PATCH",
            { "Content-Type": "application/json" },
            JSON.stringify({
               title: formState.inputs.title.value,
               description: formState.inputs.description.value,
            })
         );
         toast.info("Successfully updated a Memory.", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
         });
         history.push(`/${auth.userId}/memories`);
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

   if (!loadedMemory && !error) {
      return (
         <MemoryNotFound>
            <span>Could not find Memory, sorry!</span>
         </MemoryNotFound>
      );
   }

   if (isLoading) {
      return <Spinner asOverlay />;
   }

   return (
      !isLoading &&
      loadedMemory && (
         <MemoryFormWrapper onSubmit={memoryUpdateSubmitHandler}>
            <h2>Modifying a Memory</h2>
            <Input
               id="title"
               type="text"
               placeholder="Title"
               validators={[VALIDATOR_REQUIRE()]}
               errorText="Please enter a valid title."
               onInput={inputHandler}
               initialValid={true}
               initialValue={loadedMemory.title}
            />
            <Input
               id="description"
               element="textarea"
               placeholder="Description"
               validators={[VALIDATOR_MINLENGTH(5)]}
               errorText="Please enter a valid description (at least 5 character)."
               onInput={inputHandler}
               initialValid={true}
               initialValue={loadedMemory.description}
            />
            <SubmitMemoryButton type="submit" disabled={!formState.isValid}>
               Update Memory
            </SubmitMemoryButton>
         </MemoryFormWrapper>
      )
   );
};

export default UpdateMemory;
