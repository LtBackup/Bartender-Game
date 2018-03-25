import axios from "axios";

export default {
  // Get a user's info
  getUser: function() {
    return axios.get("/api/");
  },
  // Gets a classic cocktail
  getClassic: function(id) {
    return axios.get("/api/classic");
  },
  
  // Saves a book to the database
  updateMastery: function(cocktail) {
    return axios.post("/api/cocktails", cocktail);
  }
  // // Deletes the drink with the given name
  // deleteMastery: function(id) {
  //   return axios.delete("/api/cocktails/" + id);
  // },
};
