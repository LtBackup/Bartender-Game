import axios from "axios";
const BASEURL = "https://www.thecocktaildb.com/api/json/v1/";
const APIKEY = "1/";
const SEARCH = "search.php?s=";
const RANDOM = "random.php";
const CLASSICS = [
  "Manhattan",
  "Old Fashioned",
  "Margarita",
  "Daiquiri",
  "Mojito",
  "Sidecar",
  "Sazerac",
  "Vieux Carre",
  "Gin and Tonic",
  "Collins",
  "French 75",
  "Caipirinha",
  "Negroni",
  "Buck",
  "Moscow Mule",
  "Mint Julep",
  "Pisco Sour",
  "Amaretto Sour",
  "Dark and Stormy",
  "Martini",
  "Cosmopolitan",
  "Lion's Tail",
  "Pink Squirrel",
  "Long Island Iced Tea",
  "Pina Colada",
  "Hurricane",
  "Last Word",
  "Pimm's Cup",
  "Boulevardier"
  ];

export default {
  getRandom: function() {
    return axios.get(BASEURL + APIKEY + RANDOM);
  },
  getCocktail: function(query) {
      return axios.get(BASEURL + APIKEY + SEARCH + query);
  },
  getClassic: function(){
    return axios.get(BASEURL + APIKEY + SEARCH + CLASSICS[Math.random()*CLASSICS.length]);
  }
};
