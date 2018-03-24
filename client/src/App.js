import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Start from "./pages/Start";
import Bar from "./pages/Bar";
import Trophies from "./pages/Trophies";
import Nav from "./components/Nav";

const App = () =>
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Start} />
        <Route exact path="/mix" component={Bar} />
        <Route exact path="/trophies" component={Trophies} />
      </Switch>
    </div>
  </Router>;

export default App;
