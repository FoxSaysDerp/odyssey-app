import { useState, useEffect } from "react";
import styled from "styled-components";

import UserList from "../components/UserList";

const CenterBlock = styled.div`
   display: "flex";
   justify-content: "center";
   align-items: "center";
   width: "100%";
   height: "100vh";
`;

const Users = () => {
   const [loading, setLoading] = useState(true);
   const [users, setUsers] = useState([]);

   useEffect(() => {
      let tempUsers = [];
      fetch("https://randomuser.me/api/?results=10")
         .then((res) => res.json())
         .then((json) => {
            json.results.map((user) => {
               let newUser = {
                  id: user.login.uuid,
                  name: `${user.name.first} ${user.name.last}`,
                  picture: user.picture.medium,
                  memoriesCount: user.dob.age,
               };
               tempUsers.push(newUser);
            });
            setUsers(tempUsers);
            setLoading(false);
         });
   }, []);

   if (loading) {
      return <CenterBlock>Loading ...</CenterBlock>;
   }
   return <UserList users={users} />;
};

export default Users;
