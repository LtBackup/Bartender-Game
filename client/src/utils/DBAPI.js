import axios from "axios";
//var passport = require("../config/passport");
//var isAuthenticated = require("../config/middleware/isAuthenticated");

export default {

  // Get a user's info
  login: function(credentials) {
    console.log(credentials.username);
    return axios.post("/api/bartenders/login", credentials);
  },

  getAll: function(credentials) {
    console.log(credentials.username);
    return axios.get("/api/bartenders/login");
  },
  
  // getUser: function(credentials) {
  //   console.log(credentials.username);
  //   return axios.get("/api/bartenders/" + credentials.username);
  // },
  // Gets a classic cocktail
  createUser: function(credentials) {
    console.log(credentials.username);
    return axios.post("/api/bartenders/create", credentials);
    //return axio.post('/',
    //passport.authenticate('local', { successRedirect: '/bar', failureRedirect: '/', failureFlash: true })
    //);
  },
  
  // Saves a book to the database
  updateMastery: function(username, cocktail) {
    return axios.put("/api/bartenders/" + username, cocktail);
  }
  // // Deletes the drink with the given name
  // deleteMastery: function(id) {
  //   return axios.delete("/api/cocktails/" + id);
  // },
};
