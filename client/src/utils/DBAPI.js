import axios from "axios";
//var passport = require("../config/passport");
//var isAuthenticated = require("../passport/isAuthenticated");

export default {

  // Get a user's info
  login: function(credentials) {
    console.log("DBAPI", credentials.username);
    return axios.post("/api/bartenders/login", credentials);
  },

  // getAll: function(credentials) {
  //   console.log(credentials.username);
  //   return axios.get("/api/bartenders/login");
  // },
  

  createUser: function(credentials) {
    console.log(credentials.username);
    return axios.post("/api/bartenders/create", credentials);
    //return axio.post('/',
    //passport.authenticate('local', { successRedirect: '/bar', failureRedirect: '/', failureFlash: true })
    //);
  },
  
  updateMastery: function(username, cocktail) {
    console.log("username", username);
    console.log("cockt" ,cocktail);
    return axios.put("/api/bartenders/" + username, {drinkName: cocktail} );
  }
  // // Deletes the drink with the given name
  // deleteMastery: function(id) {
  //   return axios.delete("/api/cocktails/" + id);
  // },
};
