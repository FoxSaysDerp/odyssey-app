import { useState } from "react";
import styled from "styled-components";

import {
   VALIDATOR_EMAIL,
   VALIDATOR_MINLENGTH,
   VALIDATOR_REQUIRE,
} from "../../util/validators";
import { useForm } from "../../common/hooks/useForm";

import Input from "../../common/components/Input";
import { button } from "../../common/components/Button";
import theme from "../../styles/theme";

const AuthWrapper = styled.div`
   height: 100vh;
   width: 100%;
   display: flex;
   justify-content: center;
   padding: 30px 0;
   flex-direction: column;
`;

const AuthForm = styled.form`
   display: block;
   width: 100%;
`;

const SubmitButton = styled.button`
   ${button}
`;

const ButtonContainer = styled.div`
   margin-top: 15px;
   display: flex;
   align-items: center;
   column-gap: 30px;
`;

const SignUpButton = styled.button`
   ${button}
   display: inline-block;
   padding: 10px;
   font-size: 0.9rem;
   margin: 0 5px;
`;

const Divider = styled.span`
   display: block;
   height: 30px;
   width: 1px;
   border-radius: 1px;
   background-color: ${theme.color.gray};
`;

const Auth = () => {
   const [isLoginMode, setIsLoginMode] = useState(true);

   const { formState, inputHandler, setFormData } = useForm({
      email: {
         value: "",
         isValid: false,
      },
      password: {
         value: "",
         isValid: false,
      },
   });

   const authSubmitHandler = (e) => {
      e.preventDefault();
      console.log(formState.inputs);
   };

   const switchModeHandler = () => {
      if (!isLoginMode) {
         setFormData(
            {
               ...formState.inputs,
               name: undefined,
            },
            formState.inputs.email.isValid && formState.inputs.password.isValid
         );
      } else {
         setFormData(
            {
               ...formState.inputs,
               name: {
                  value: "",
                  isValid: false,
               },
            },
            false
         );
      }
      setIsLoginMode((prevState) => !prevState);
   };

   return (
      <AuthWrapper>
         <h2>Login to continue</h2>
         <hr />
         <AuthForm onSubmit={authSubmitHandler}>
            {!isLoginMode && (
               <Input
                  id="name"
                  type="text"
                  label="Name"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter a name."
                  onInput={inputHandler}
               />
            )}
            <Input
               id="email"
               type="email"
               label="Email"
               validators={[VALIDATOR_EMAIL()]}
               errorText="Please enter a valid email"
               onInput={inputHandler}
            />
            <Input
               id="password"
               type="password"
               label="Password"
               validators={[VALIDATOR_MINLENGTH(10)]}
               errorText="Please enter a valid password (at least 10 characters)."
               onInput={inputHandler}
            />
            {isLoginMode ? (
               <ButtonContainer>
                  <SubmitButton type="submit" disabled={!formState.isValid}>
                     Login
                  </SubmitButton>
                  <Divider />
                  <span>
                     Are you new here?{" "}
                     <SignUpButton onClick={switchModeHandler}>
                        Click here
                     </SignUpButton>{" "}
                     to sign up.
                  </span>
               </ButtonContainer>
            ) : (
               <ButtonContainer>
                  <SubmitButton type="submit" disabled={!formState.isValid}>
                     Register
                  </SubmitButton>
                  <Divider />
                  <span>
                     Do you already have an account?{" "}
                     <SignUpButton onClick={switchModeHandler}>
                        Click here
                     </SignUpButton>{" "}
                     to log in.
                  </span>
               </ButtonContainer>
            )}
         </AuthForm>
      </AuthWrapper>
   );
};

export default Auth;
