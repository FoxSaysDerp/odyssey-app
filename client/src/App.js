import "reset-css";
import "./styles/app.scss";
import "react-toastify/dist/ReactToastify.css";

import { useState, useCallback, useEffect } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { AuthContext } from "./common/context/auth-context";
import { ThemeContext } from "./common/context/theme-context";
import moment from "moment";
import { toast } from "react-toastify";

import { Main } from "./styles/Main";

import Header from "./common/components/Layout/Header";
import { ToastContainer } from "react-toastify";

import Users from "./user/pages/Users";
import Auth from "./user/pages/Auth";
import Logout from "./user/pages/Logout";

import AllMemories from "./memories/pages/AllMemories";
import NewMemory from "./memories/pages/NewMemory";
import UpdateMemory from "./memories/pages/UpdateMemory";
import UserMemories from "./memories/pages/UserMemories";

let logoutTimer;

const App = () => {
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

   const [isMenuExpanded, setIsMenuExpanded] = useState(true);

   const toggleMenuExpansion = useCallback(() => {
      setIsMenuExpanded((prevState) => !prevState);
   });

   let routes;

   if (token) {
      routes = (
         <Switch>
            <Route path="/" component={AllMemories} exact />
            <Route path="/users" component={Users} exact />
            <Route path="/memories/new" component={NewMemory} exact />
            <Route path="/memories/:memoryId" component={UpdateMemory} exact />
            <Route path="/:userId/memories" component={UserMemories} exact />
            <Route path="/logout" component={Logout} exact />
            <Redirect to="/" />
         </Switch>
      );
   } else {
      routes = (
         <Switch>
            <Route path="/" component={AllMemories} exact />
            <Route path="/users" component={Users} exact />
            <Route path="/:userId/memories" component={UserMemories} exact />
            <Route path="/auth" component={Auth} exact />
            <Redirect to="/auth" />
         </Switch>
      );
   }

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

   return (
      <AuthContext.Provider
         value={{
            isLoggedIn: !!token,
            token: token,
            login: login,
            logout: logout,
            userId: userId,
         }}
      >
         <ThemeContext.Provider
            value={{
               isMenuExpanded: isMenuExpanded,
               toggleMenuExpansion: toggleMenuExpansion,
            }}
         >
            <BrowserRouter>
               <Header />
               <Main isMenuExpanded={isMenuExpanded}>{routes}</Main>
               <ToastContainer
                  position="bottom-right"
                  autoClose={2000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss={false}
                  draggable={false}
                  pauseOnHover
               />
            </BrowserRouter>
         </ThemeContext.Provider>
      </AuthContext.Provider>
   );
};

export default App;
