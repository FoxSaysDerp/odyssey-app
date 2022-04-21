import { useReducer, useEffect } from "react";
import { validate } from "../../util/validators";
import styled from "styled-components";

const InputWrapper = styled.div`
   display: block;
   position: relative;
   ${({ hidden }) =>
      hidden &&
      `
      display: none;
   `}
`;
const InputLabel = styled.label`
   display: block;
`;

const InputField = styled.input`
   display: block;
   width: calc(100% - 6px);
   padding: 3px 4px;
   margin: 0;
   ${({ isValid, isTouched }) =>
      !isValid &&
      isTouched &&
      `
   border: 1px solid #f5c9cd;
   background-color: #f8d7da;
   `}
`;

const InputTextArea = styled.textarea`
   display: block;
   width: 100%;
   ${({ isValid, isTouched }) =>
      !isValid &&
      isTouched &&
      `
   border: 1px solid #f5c9cd;
   background-color: #f8d7da;
   `}
`;

const ErrorText = styled.p`
   display: block;
   font-size: 0.8rem;
   color: #831c21;
   background-color: #f8d7da;
   border: 1px solid #f5c9cd;
   border-radius: 8px;
   padding: 8px;
   width: calc(100% - 16px);
   text-align: center;
`;

const inputReducer = (state, action) => {
   switch (action.type) {
      case "CHANGE":
         return {
            ...state,
            value: action.val,
            isValid: validate(action.val, action.validators),
         };
      case "TOUCH":
         return {
            ...state,
            isTouched: true,
         };
      default:
         return state;
   }
};

const Input = ({
   id,
   label,
   type,
   element,
   placeholder,
   rows,
   errorText,
   validators,
   onInput,
   hidden,
   initialValue,
   initialIsValid,
}) => {
   const [inputState, dispatch] = useReducer(inputReducer, {
      value: initialValue || "",
      isValid: initialIsValid || false,
      isTouched: false,
   });

   const changeHandler = (e) => {
      dispatch({ type: "CHANGE", val: e.target.value, validators: validators });
   };

   const touchHandler = () => {
      dispatch({ type: "TOUCH" });
   };

   useEffect(() => {
      onInput(id, inputState.value, inputState.isValid);
   }, [id, inputState.value, inputState.isValid, onInput]);

   return (
      <InputWrapper hidden={hidden}>
         {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
         {element === "textarea" ? (
            <InputTextArea
               id={id}
               rows={rows || 3}
               onChange={changeHandler}
               onBlur={touchHandler}
               value={inputState.value}
               isValid={inputState.isValid}
               isTouched={inputState.isTouched}
            />
         ) : (
            <InputField
               id={id}
               type={type}
               placeholder={placeholder || null}
               onChange={changeHandler}
               onBlur={touchHandler}
               value={inputState.value}
               isValid={inputState.isValid}
               isTouched={inputState.isTouched}
            />
         )}
         {!inputState.isValid && inputState.isTouched && errorText && (
            <ErrorText>{errorText}</ErrorText>
         )}
      </InputWrapper>
   );
};

export default Input;
