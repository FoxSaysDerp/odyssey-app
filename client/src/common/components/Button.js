import { css } from "styled-components";
import theme from "../../styles/theme";

export const button = css`
   font-family: ${theme.fonts.poppins};
   text-decoration: none;
   margin: 0;
   outline: 0;
   border: 0;
   padding: 10px 30px;
   background-color: ${theme.color.mainColor};
   font-size: 1.1rem;
   color: #fff;
   border-radius: 16px;
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
   &[disabled] {
      filter: saturate(0.3);
      opacity: 0.5;
      cursor: not-allowed;
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

export const buttonGradient = css`
   ${button}
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
