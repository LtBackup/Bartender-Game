import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, BrowserHistory, WithRouter } from "react-router-dom";
import Start from "./pages/Start";
import Bar from "./pages/Bar";
import Trophies from "./pages/Trophies";
import Nav from "./components/Nav";
import DBAPI from "./utils/DBAPI.js";

class App extends Component {
  constructor(props) {
    console.log("props", props);
    super(props);
    this.state = {
      isAuthenticated: false,
      loggedUser: "",
      username: "",
      password: "",
      badCreds: false
    };
  }

  handleLogin = (user, pass) => {
    this.setState({ username: user, password: pass }, function () {
      console.log("set username", this.state.username);
      console.log("set password", this.state.password);
      let currUser = this.state.username;
    console.log("currUser", currUser);
    if (this.state.username && this.state.password) {
      console.log("calling login");
      DBAPI.login({
        username: this.state.username,
        password: this.state.password
      })
        .then((res) => {
          this.setState({ isAuthenticated: true, loggedUser: currUser, username: "", password: "", badCreds: false }, function () {
            console.log("is authed?", this.state.isAuthenticated);
            console.log("logged user?", this.state.loggedUser);
          })
        })
        .catch(err => {
          this.setState({ badCreds: true });
          console.log(err);
        });
    }
    }); 
  }

  handleNew = (user, pass) => {
    this.setState({ username: user, password: pass }, function () {
      console.log("set username", this.state.username);
      console.log("set password", this.state.password);
      let currUser = this.state.username;
    if (this.state.username && this.state.password) {
      DBAPI.createUser({
        username: this.state.username,
        password: this.state.password
      })
        .then(res => {
          this.setState({ isAuthenticated: true, loggedUser: currUser, badCreds: false }, function () {
            console.log("set username", this.state.username);
            console.log("set password", this.state.password);
          }
          )
        })
        .then(res => {
          console.log("new user?", this.state.currUser);
        })
        .catch(err => {
          this.setState({ badCreds: true });
          console.log(err);
        });
      }
    });
  };

  toggleBadCreds = () => {
    this.setState({ badCreds: false });
  }

  logout = (event) => {
    event.preventDefault();
    DBAPI.logout()
    .then(res => {
      this.setState({ isAuthenticated: false, loggedUser: "", username: "", password: "", badCreds: false });
    });
  }

  render(props) {
    return (
      <Router>
        <div>
          <Nav isAuthenticated={this.state.isAuthenticated} logout={this.logout} />
          <Switch>
            <Route exact path="/" render={(props) => (
                  this.state.loggedUser?
                  <Redirect to="/bar" />:
                  <Start {...props}
                  handleLogin={this.handleLogin}
                  handleNew={this.handleNew}
                  setCredentials={this.setCredentials}
                  badCreds={this.state.badCreds} 
                  toggleBadCreds={this.toggleBadCreds}
                  />
                )}/>
            <Route exact path="/bar" render={(props) => (
              this.state.loggedUser?
                <Bar {...props} loggedUser={this.state.loggedUser} /> :
                <Redirect to="/" />
            )}
            />
            <Route exact path="/trophies" render={(props) => (
              this.state.loggedUser?
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
