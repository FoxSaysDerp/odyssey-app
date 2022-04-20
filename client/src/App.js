import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import Header from "./common/components/Layout/Header";
import Users from "./user/pages/Users";
import NewMemory from "./memories/pages/NewMemory";

const App = () => {
   return (
      <BrowserRouter>
         <Header />
         <Switch>
            <Route path="/users" component={Users} exact />
            <Route path="/memories/new" component={NewMemory} exact />
            <Redirect to="/" />
         </Switch>
      </BrowserRouter>
   );
};

export default App;
