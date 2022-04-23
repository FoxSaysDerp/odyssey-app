import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import theme from "../../styles/theme";
import { AuthContext } from "../../common/context/auth-context";

const UserItemLi = styled.li`
   width: 100%;
   position: relative;
   list-style-type: none;
   display: grid;
   grid-template-columns: 70px 1fr;
   grid-template-rows: repeat(2, 1fr);
   grid-column-gap: 30px;
   grid-row-gap: 15px;
   border-radius: 8px;
   border: 1px solid #bbbbbb;
   padding: 9px 9px;
   box-shadow: ${theme.shadow.normal};
`;

const UserPictureWrapper = styled.div`
   grid-area: 1 / 1/ 3 / 3;
   max-height: 70px;
   max-width: 70px;
   aspect-ratio: 1;
   border-radius: 50em;
   background: ${({ isCurrentUser }) =>
      isCurrentUser ? theme.gradient.main : "#fff"};
   padding: 4px;
   z-index: 1;
   position: relative;
`;

const UserPicture = styled.img`
   width: calc(100% - 9px);
   height: calc(100% - 9px);
   object-fit: cover;
   border-radius: 50em;
   padding: 3px;
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   z-index: 2;
   background-color: #fff;
`;

const UserName = styled.div`
   grid-area: 1 / 2/ 3/ 3;
   font-weight: 500;
   font-size: 32px;
`;

const UserMemories = styled.div`
   grid-area: 2 / 2 / 3 /3;
   > span {
      font-weight: 700;
   }
`;

const UserId = styled.div`
   position: absolute;
   right: 10px;
   bottom: 10px;
   opacity: 0.5;
   font-size: 10px;
`;

const UserLink = styled(Link)`
   text-decoration: none;
   color: #000;
   transition: all 0.3s ease-in-out;
   &:hover,
   &:focus {
      transform: translateY(-2px) scale(1.03);
   }
`;

const UserItem = ({ id, name, picture, memoriesCount }) => {
   const auth = useContext(AuthContext);

   return (
      <UserLink to={`${id}/memories`}>
         <UserItemLi>
            <UserPictureWrapper
               isCurrentUser={auth.userId ?? auth.userId === id}
            >
               <UserPicture
                  src={picture}
                  alt={`${name}'s picture`}
                  className="user-item__picture"
               />
            </UserPictureWrapper>
            <UserName>{name}</UserName>
            <UserMemories>
               Memories: <span>{memoriesCount}</span>
            </UserMemories>
            <UserId>{id}</UserId>
         </UserItemLi>
      </UserLink>
   );
};

export default UserItem;
