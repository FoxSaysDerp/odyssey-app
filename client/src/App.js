import "./styles/app.scss";

import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import { Main } from "./styles/Main";

import Header from "./common/components/Layout/Header";
import Users from "./user/pages/Users";
import NewMemory from "./memories/pages/NewMemory";
import UserMemories from "./memories/pages/UserMemories";

const App = () => {
   return (
      <BrowserRouter>
         <Header />
         <Main>
            <Switch>
               <Route path="/users" component={Users} exact />
               <Route path="/memories/new" component={NewMemory} exact />
               <Route path="/:userId/memories" component={UserMemories} exact />
               <Redirect to="/" />
            </Switch>
         </Main>
      </BrowserRouter>
   );
};

export default App;
