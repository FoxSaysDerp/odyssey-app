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
   width: 100%;
   margin: 30px 0;
   animation: ${fadeIn} 0.5s ease-in-out;
   transition: all 0.3s ease-in-out;
   padding: 0;
`;

const UserList = ({ users }) => {
   if (users.length === 0) {
      return (
         <div>
            <h3>{"No users found, sorry. :("}</h3>
         </div>
      );
   }

   // users.sort((a, b) => {
   //    return b.memories.length - a.memories.length;
   // });

   return (
      <UserListUl>
         {users.map((user) => {
            return (
               <UserItem
                  key={user.id}
                  id={user.id}
                  name={user.name}
                  picture={user.image}
                  memoriesCount={user.memories.length}
               />
            );
         })}
      </UserListUl>
   );
};

export default UserList;
