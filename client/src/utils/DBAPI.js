import axios from "axios";


export default {
  // Get a user's info
  getUser: function(username) {
    return axios.get("/api/" + username);
  },
  // Gets a classic cocktail
  createUser: function(credentials) {
    return axios.post("/api/", credentials);
  },
  
  // Saves a book to the database
  updateMastery: function(username, cocktail) {
    return axios.post("/api/" + username, cocktail);
  }
  // // Deletes the drink with the given name
  // deleteMastery: function(id) {
  //   return axios.delete("/api/cocktails/" + id);
  // },
};
