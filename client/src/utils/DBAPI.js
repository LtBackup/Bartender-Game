import axios from "axios";

/**
* MongoDB api
*
* @param user credentials
* 
* @returns relevant database documents
*/
export default {
  login: function(credentials) {
    return axios.post("/api/bartenders/login", credentials);
  },

   getDrinks: function(username) {
    return axios.get("/api/bartenders/" + username);
   },

  logout: function() {
    return axios.get("/api/bartenders/logout");
  },

  createUser: function(credentials) {
    return axios.post("/api/bartenders/create", credentials);
  },
  
  updateMastery: function(username, cocktailData) {
    return axios.put("/api/bartenders/" + username, cocktailData );
  }
};
