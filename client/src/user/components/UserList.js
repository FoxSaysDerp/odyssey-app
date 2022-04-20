import styled, { keyframes } from "styled-components";
import UserItem from "./UserItem";

const fadeIn = keyframes`
   from {
      opacity: 0;
      top: -5px;
   }
   to {
      opacity: 1;
      top: 0;
   }
`;

const UserListUl = styled.ul`
   list-style-type: none;
   display: flex;
   row-gap: 15px;
   flex-direction: column;
   width: 600px;
   margin: 30px auto;
   animation: ${fadeIn} 0.5s ease-in-out;
   transition: all 0.3s ease-in-out;
`;

const UserList = ({ users }) => {
   if (users.length === 0) {
      return (
         <div>
            <h3>{"No users found, sorry. :("}</h3>
         </div>
      );
   }

   users.sort((a, b) => {
      return b.memoriesCount - a.memoriesCount;
   });

   return (
      <UserListUl>
         {users.map((user) => {
            return (
               <UserItem
                  key={user.id}
                  id={user.id}
                  name={user.name}
                  picture={user.picture}
                  memoriesCount={user.memoriesCount}
               />
            );
         })}
      </UserListUl>
   );
};

export default UserList;
