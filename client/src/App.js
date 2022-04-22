import "./styles/app.scss";

import { useState, useCallback } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { AuthContext } from "./common/context/auth-context";

import { Main } from "./styles/Main";

import Header from "./common/components/Layout/Header";

import Users from "./user/pages/Users";
import Auth from "./user/pages/Auth";
import Logout from "./user/pages/Logout";

import AllMemories from "./memories/pages/AllMemories";
import NewMemory from "./memories/pages/NewMemory";
import UpdateMemory from "./memories/pages/UpdateMemory";
import UserMemories from "./memories/pages/UserMemories";

const App = () => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);

   const login = useCallback(() => {
      setIsLoggedIn(true);
   }, []);
   const logout = useCallback(() => {
      setIsLoggedIn(false);
   }, []);

   let routes;

   if (isLoggedIn) {
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
   return (
      <AuthContext.Provider
         value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
      >
         <BrowserRouter>
            <Header />
            <Main>{routes}</Main>
         </BrowserRouter>
      </AuthContext.Provider>
   );
};

export default App;
