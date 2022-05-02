import { useState, useCallback, useEffect } from "react";
import moment from "moment";
import { toast } from "react-toastify";

let logoutTimer;

export const useAuth = () => {
   const [token, setToken] = useState(false);
   const [tokenExpirationDate, setTokenExpirationDate] = useState();
   const [userId, setUserId] = useState(null);

   const login = useCallback((uid, token, expirationDate) => {
      setToken(token);
      setUserId(uid);

      const tokenExpirationDate = expirationDate || moment().add(1, "h");
      setTokenExpirationDate(tokenExpirationDate);

      localStorage.setItem(
         "userData",
         JSON.stringify({
            userId: uid,
            token: token,
            expiration: tokenExpirationDate.toISOString(),
         })
      );
      toast.success("You have succesfully logged in!", {
         position: "bottom-right",
         autoClose: 2000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: false,
         progress: 0,
      });
   }, []);

   const logout = useCallback(() => {
      setToken(null);
      setUserId(null);
      localStorage.removeItem("userData");

      toast.info("You have logged out.", {
         position: "bottom-right",
         autoClose: 2000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: false,
         progress: 0,
      });
   }, []);

   useEffect(() => {
      if (token && tokenExpirationDate) {
         const remainingTime = moment(tokenExpirationDate) - moment();

         logoutTimer = setTimeout(logout, remainingTime);
      } else {
         clearTimeout(logoutTimer);
      }
   }, [token, logout, tokenExpirationDate]);

   useEffect(() => {
      const storedData = JSON.parse(localStorage.getItem("userData"));
      if (
         storedData &&
         storedData.token &&
         moment(storedData.expiration) > moment()
      ) {
         login(
            storedData.userId,
            storedData.token,
            moment(storedData.expiration)
         );
      }
   }, [login]);

   return { token, login, logout, userId };
};
