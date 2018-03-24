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
  "Gin and Tonic",
  "Collins",
  "French 75",
  "Caipirinha",
  "Negroni",
  "Moscow Mule",
  "Mint Julep",
  "Pisco Sour",
  "Amaretto Sour",
  "Dark and Stormy",
  "Martini",
  "Cosmopolitan",
  "Long Island Iced Tea",
  "Pina Colada",
  "Boulevardier"
  ];
  //to add: Pink Squirrel, Vieux Carre, Buck, Last Word, Lion's Tail, Pimm's Cup, Hurricane

export default {
  getRandom: function() {
    return axios.get(BASEURL + APIKEY + RANDOM);
  },
  getCocktail: function(query) {
      return axios.get(BASEURL + APIKEY + SEARCH + query);
  },
  getClassic: function(){
    const classic = CLASSICS[Math.floor(Math.random()*CLASSICS.length)];
    console.log(classic);
    return axios.get(BASEURL + APIKEY + SEARCH + classic);
  }
};
