import React from "react";
import styled, { keyframes } from "styled-components";
import theme from "../../styles/theme";

const ldsDualRing = keyframes`
   0% {
     transform: rotate(0deg);
   }
   100% {
     transform: rotate(360deg);
   }
`;

const LoadingSpinnerOverlay = styled.div`
   z-index: 99999;
   height: 100vh;
   width: 100%;
   position: absolute;
   top: 0;
   left: 0;
   background: rgba(255, 255, 255, 0.9);
   display: flex;
   justify-content: center;
   align-items: center;
`;

const LdsDualRing = styled.div`
   display: inline-block;
   width: 64px;
   height: 64px;
   &:after {
      content: " ";
      display: block;
      width: 46px;
      height: 46px;
      margin: 1px;
      border-radius: 50%;
      border: 5px solid ${theme.color.mainColor};
      border-color: ${theme.color.mainColor} transparent
         ${theme.color.mainColor} transparent;
      animation: ${ldsDualRing} 1.2s linear infinite;
   }
`;

const Spinner = ({ asOverlay }) => {
   return (
      <LoadingSpinnerOverlay className={asOverlay}>
         <LdsDualRing />
      </LoadingSpinnerOverlay>
   );
};

export default Spinner;
