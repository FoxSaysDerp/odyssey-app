import styled from "styled-components";

export const Main = styled.main`
   padding-top: 30px;
   padding-bottom: 30px;
   padding-right: 30px;
   transition: all 0.3s ease-in-out;
   ${({ isMenuExpanded }) =>
      !isMenuExpanded &&
      `
   padding-left: min(33% + 30px, 365px);
   
   `}
   ${({ isMenuExpanded }) =>
      isMenuExpanded &&
      `
    padding-left: min(10% + 30px, 165px)
    `}
`;
