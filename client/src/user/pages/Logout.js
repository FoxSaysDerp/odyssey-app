import { useContext, useEffect } from "react";
import styled from "styled-components";
import { AuthContext } from "../../common/context/auth-context";
import { toast } from "react-toastify";

const LogoutWrapper = styled.div`
   height: 100vh;
   width: 100%;
   display: flex;
   justify-content: center;
   padding: 30px 0;
   flex-direction: column;
   > p {
      text-align: center;
      margin-bottom: 15px;
   }
`;

const Logout = () => {
   const auth = useContext(AuthContext);

   useEffect(() => {
      toast.info("You have successfully logged out", {
         position: "bottom-right",
         autoClose: 2000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: false,
         progress: 0,
      });
      auth.logout();
   }, []);

   return (
      <LogoutWrapper>
         <p>You have sucessfully log out.</p>
         <p>You will be redirected shortly...</p>
      </LogoutWrapper>
   );
};

export default Logout;
