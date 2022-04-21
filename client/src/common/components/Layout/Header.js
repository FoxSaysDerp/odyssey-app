import { useState } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import classnames from "classnames";
import theme from "../../../styles/theme";

import { FaCameraRetro } from "react-icons/fa";

import { Container } from "../../../styles/Main";

import nav from "../../../constant/nav";

const HeaderWrapper = styled.header`
   position: fixed;
   top: 0;
   left: 0;
   max-width: 350px;
   width: 33%;
   height: 100vh;
   padding: 7px 0;
   background-color: ${theme.color.lightGray};
   box-shadow: inset -10px 0px 24px -2px ${theme.color.gray};
   transition: all 0.3s ease-in-out;

   &.closed {
      width: 10%;
      max-width: 150px;
   }

   &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 8px;
      background: ${theme.gradient.main};
   }

   &:after {
      content: "";
      position: absolute;
      right: 0;
      top: 0;
      height: 100vh;
      width: 10px;
      border-radius: 16px 0 0 16px;
      background-color: white;
   }
`;

const HeaderContainer = styled(Container)`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   height: 100%;
`;

const Logo = styled.h1`
   font-size: 3.25rem;
   line-height: 1;
   font-weight: 700;
   font-family: ${theme.fonts.dancingScript};
   text-align: center;
   &.closed {
      display: none;
   }
`;

const LogoIcon = styled(FaCameraRetro)`
   display: inline-block;
   height: 3rem;
   width: 3rem;
   &.closed {
      margin-bottom: 30px;
   }
`;

const HeaderLink = styled(Link)`
   color: black;
   text-decoration: none;
   display: flex;
   align-items: center;
   justify-content: center;
   column-gap: 15px;
   margin-bottom: 15px;
`;

const Navigation = styled.nav`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: flex-start;
   row-gap: 15px;
   &.closed {
      align-items: center;
   }
`;

const fadeIn = keyframes`
   from {
      opacity: 0;
      position: absolute;
   }
   to {
      opacity: 1;
      position: relative;
   }
`;

const NavigationLink = styled(NavLink)`
   color: #000;
   text-decoration: none;
   font-size: 1.5rem;
   transition: all 0.3s ease-in-out;
   .react-icon {
      height: 2rem;
      width: 2rem;
      transform: translateY(5px);
      margin-right: 30px;
   }
   > span {
      animation: ${fadeIn} 1s forwards;

      white-space: nowrap;
   }
   &.active {
      color: ${theme.color.dustyGray};
   }
   &.closed {
      > span {
         display: none;
      }
      .react-icon {
         margin-right: unset;
      }
      display: flex;
      justify-content: center;
      margin-bottom: 15px;
   }
`;

const MenuButton = styled.button`
   position: absolute;
   right: 8px;
   border: none;
   width: 2rem;
   height: 2rem;
   border-radius: 16px 0 0 16px;
   background-color: #fff;
   bottom: 10%;
   color: #000;
   box-shadow: ${theme.shadow.normal};
   cursor: pointer;
`;

const Header = () => {
   const [isClosed, setIsClosed] = useState(true);
   return (
      <HeaderWrapper className={classnames({ closed: isClosed })}>
         <HeaderContainer>
            <HeaderLink to="/">
               <LogoIcon className={classnames({ closed: isClosed })} />
               <Logo className={classnames({ closed: isClosed })}>Odyssey</Logo>
            </HeaderLink>
            <Navigation className={classnames({ closed: isClosed })}>
               {nav.map((item, index) => {
                  return (
                     <NavigationLink
                        to={item.link}
                        key={index}
                        className={classnames({ closed: isClosed })}
                        activeClassName="active"
                        exact
                     >
                        {item.icon} <span>{item.label}</span>
                     </NavigationLink>
                  );
               })}
            </Navigation>
            <MenuButton onClick={() => setIsClosed(!isClosed)}>
               {isClosed ? ">" : "<"}
            </MenuButton>
         </HeaderContainer>
      </HeaderWrapper>
   );
};

export default withRouter(Header);
