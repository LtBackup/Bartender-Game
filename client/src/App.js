import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Start from "./pages/Start";
import Bar from "./pages/Bar";
import Trophies from "./pages/Trophies";
import Nav from "./components/Nav";
import CocktailAPI from "./utils/CocktailAPI.js";
import DBAPI from "./utils/DBAPI.js";

// pass the authenticaion checker middleware
class App extends Component {
  state = {
    isAuthenticated: "",
    username: "",
    password: ""
  };

  handleLogin = event => {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      DBAPI.login({
        username: this.state.username,
        password: this.state.password
      })
        .then(res => this.setState({loggedIn: true, password: ""}))
        .then(res => console.log("hi"))
        .then(res => console.log("logged in?", this.state.loggedIn))
        .then(res => res.redirect("/bar"))
        .catch(err => console.log(err));
    }
  };

  handleNew = event => {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      DBAPI.createUser({
        username: this.state.username,
        password: this.state.password
      })
        .then(res => this.setState({loggedIn: true, password: ""}))
        .then(res => console.log("new user?", this.state.loggedIn))
        .then(res => res.redirect("/bar"))
        .catch(err => console.log(err));
    }
  };

  render(props) {
    return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" render={(props) =>
            (<Start {...props} handleLogin={this.handleLogin} handleNew={this.handleNew}/>)}
            />
          <Route exact path="/bar" component={Bar} />
          <Route exact path="/trophies" component={Trophies} />
        </Switch>
      </div>
    </Router>
    );
  }
}

export default App;
