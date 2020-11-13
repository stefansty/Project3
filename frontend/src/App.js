import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Person from "./Person/Pages/Person";
import UpdatePersons from "./Person/Pages/UpdatePersons";
import NewPerson from "./Person/Pages/NewPerson";
import MainNavigation from "./Shared/Navigation/MainNavigation";

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <Person />
          </Route>
          <Route path="/person/new" exact>
            <NewPerson />
          </Route>
          <Route path="/person/:personId">
            <UpdatePersons />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
