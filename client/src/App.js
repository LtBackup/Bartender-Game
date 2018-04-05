import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Start from "./pages/Start";
import Bar from "./pages/Bar";
import Trophies from "./pages/Trophies";
import Nav from "./components/Nav";
import DBAPI from "./utils/DBAPI.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      loggedUser: "",
      username: "",
      password: "",
      badCreds: false
    };
  }

  /**
  * Takes information from the login form and used it for a database call to validate login credentials
  *
  * @param {strings} that contains username and password info
  * 
  * @returns void
  */
  handleLogin = (user, pass) => {
    this.setState({ username: user, password: pass }, function () {
      let currUser = this.state.username;
    if (this.state.username && this.state.password) {
      DBAPI.login({
        username: this.state.username,
        password: this.state.password
      })
        .then((res) => {
          this.setState({ isAuthenticated: true, loggedUser: currUser, username: "", password: "", badCreds: false }, function () {
          })
        })
        .catch(err => {
          this.setState({ badCreds: true });
          console.log(err);
        });
    }
    }); 
  }
  /**
  * Takes information from the sign up form and uses it to create a new user
  *
  * @param {strings} that contains username and password info
  * 
  * @returns void
  */
  handleNew = (user, pass) => {
    this.setState({ username: user, password: pass }, function () {
      let currUser = this.state.username;
    if (this.state.username && this.state.password) {
      DBAPI.createUser({
        username: this.state.username,
        password: this.state.password
      })
        .then(res => {
          this.setState({ isAuthenticated: true, loggedUser: currUser, badCreds: false })
        })
        .catch(err => {
          this.setState({ badCreds: true });
          console.log(err);
        });
      }
    });
  };

  /**
  * resets the badCreds variable to ensure no pesisting errors on login
  * 
  * @returns void
  */
  toggleBadCreds = () => {
    this.setState({ badCreds: false });
  }

  /**
  * Ends the authentication session and locks access to inner pages. Also resets session state variables
  *
  * @param {event} from pushing the logout button
  * 
  * @returns void
  */
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
