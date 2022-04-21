import styled from "styled-components";
import theme from "./theme";

export const Main = styled.main`
   width: calc(66%-30px);
   padding-left: min(33% + 30px, 350px);
`;

export const Container = styled.div`
   display: block;
   margin: 0 auto;
   max-width: 1320px;
   padding: 0 15px;
   ${theme.mixins.xl} {
      max-width: 1140px;
   }
   ${theme.mixins.lg} {
      max-width: 960px;
   }
   ${theme.mixins.md} {
      max-width: 720px;
   }
   ${theme.mixins.sm} {
      max-width: unset;
      padding: 0 30px;
   }
   ${theme.mixins.xs} {
      padding: 0 15px;
   }
`;

export const Button = styled.button`
   margin: 0;
   outline: 0;
   border: 0;
   padding: 12px 15px;
   background-color: ${theme.color.mainColor};
   font-size: 1.2rem;
   color: #fff;
   border-radius: 8px;
   border: 1px solid transparent;
   transition: all 0.3s ease-in-out;
   display: flex;
   justify-content: center;
   align-items: center;
   .react-icon {
      height: 0.75rem;
      width: 0.75rem;
      color: #fff;
      margin-right: 8px;
      transition: all 0.3s ease-in-out;
   }
   &:hover,
   &:focus {
      background-color: ${theme.color.mainColorHalf};
      box-shadow: 0 8px 32px 0 ${theme.color.mainColorHalf};
      backdrop-filter: blur(4px);
      border: 1px solid ${theme.color.mainColorHalf};
      .react-icon {
         color: ${theme.color.mainColor};
      }
   }
   &:active {
      opacity: 0.8;
   }
`;

export const ButtonGradient = styled(Button)`
   background: ${theme.gradient.main};
   font-weight: 500;
   border: none;
   &:hover,
   &:focus {
      border: 1px;
      .react-icon {
         color: #fff;
      }
   }
`;
