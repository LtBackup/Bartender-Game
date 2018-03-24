import axios from "axios";

export default {
  // Gets a random cocktail
  getRandomCocktail: function() {
    return axios.get("/api/random");
  },
  // Gets a classic cocktail
  getClassic: function(id) {
    return axios.get("/api/classic");
  },
  // Deletes the book with the given id
  deleteMastery: function(id) {
    return axios.delete("/api/cocktails/" + id);
  },
  // Saves a book to the database
  updateMastery: function(cocktail) {
    return axios.post("/api/cocktails", cocktail);
  }
};
