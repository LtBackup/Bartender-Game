import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Start from "./pages/Start";
import Bar from "./pages/Bar";
import Trophies from "./pages/Trophies";
import Nav from "./components/Nav";
import CocktailAPI from "./utils/CocktailAPI.js";
import DBAPI from "./utils/DBAPI.js";

// pass the authenticaion checker middleware
class App extends Component {
  constructor(props) {
    console.log("props", props);
    super(props);
    this.state = {
      isAuthenticated: false,
      loggedUser: "",
      username: "",
      password: ""
    };
  }

  setCredentials = (user, pass) => {
    this.setState({ username: user, password: pass }, function () {
      console.log("set username", this.state.username);
      console.log("set password", this.state.password);
      this.handleLogin();
    });
  }

  handleLogin = () => {
    //console.log(event);
    let currUser = this.state.username;
    //event.preventDefault();
    console.log("currUser", currUser);
    if (this.state.username && this.state.password) {
      console.log("calling login");
      DBAPI.login({
        username: this.state.username,
        password: this.state.password
      })
        .then((data) => {
          console.log("data to set", data);
          this.setState({ isAuthenticated: true, loggedUser: currUser }, function () {
            console.log("is authed?", this.state.isAuthenticated);
            console.log("logged user?", this.state.loggedUser);
          })
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  }

  handleNew = () => {
    let currUser = this.state.username;
    if (this.state.username && this.state.password) {
      DBAPI.createUser({
        username: this.state.username,
        password: this.state.password
      })
        .then(res => {
          this.setState({ isAuthenticated: true, loggedUser: currUser }, function () {
            console.log("set username", this.state.username);
            console.log("set password", this.state.password);
          }
          )
        })
        .then(res => console.log("new user?", this.state.loggedIn))
        .then(res => res.redirect("/bar"))
        .catch(err => console.log(err));
    }
  };

  render(props) {
    return (
      <Router>
        <div>
          <Nav isAuthenticated={this.state.isAuthenticated} />
          <Switch>
            <Route exact path="/" render={(props) =>
              (<Start {...props} handleLogin={this.handleLogin} handleNew={this.handleNew} setCredentials={this.setCredentials} />)}
            />
            <Route exact path="/bar" render={(props) => (
              this.state.loggedUser ?
                <Bar {...props} loggedUser={this.state.loggedUser} /> :
                <Redirect to="/" />
            )}
            />
            <Route exact path="/trophies" render={(props) => (
              this.state.loggedUser ?
                (<Trophies {...props} loggedUser={this.state.loggedUser} />) :
                <Redirect to="/" />
            )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
