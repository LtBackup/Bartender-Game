import axios from "axios";

export default {
  login: function(credentials) {
    console.log("DBAPI", credentials.username);
    return axios.post("/api/bartenders/login", credentials);
  },

   getDrinks: function(username) {
    console.log(username);
    return axios.get("/api/bartenders/" + username);
   },

  logout: function() {
    return axios.get("/api/bartenders/logout");
  },

  createUser: function(credentials) {
    console.log(credentials.username);
    return axios.post("/api/bartenders/create", credentials);
  },
  
  updateMastery: function(username, cocktailData) {
    console.log("username", username);
    console.log("cocktailData" , cocktailData);
    return axios.put("/api/bartenders/" + username, cocktailData );
  }
};
