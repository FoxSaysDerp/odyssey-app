import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderWrapper = styled.header`
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   padding: 15px;
`;

const Logo = styled.h1`
   font-size: 72px;
`;

const Header = () => {
   return (
      <HeaderWrapper>
         <Link to="/">
            <Logo>Odyssey</Logo>
         </Link>
      </HeaderWrapper>
   );
};

export default Header;
