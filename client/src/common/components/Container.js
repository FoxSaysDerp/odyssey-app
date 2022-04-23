import styled from "styled-components";
import theme from "./theme";

export const Container = styled.div`
   display: block;
   margin: 0 auto;
   max-width: 1320px;
   padding: 30px 15px;
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
