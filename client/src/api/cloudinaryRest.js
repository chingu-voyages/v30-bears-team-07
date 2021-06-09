import axios from "axios";

const serverURL = "http://localhost:5000";
// for production environment just replace it with the server heroku URL
// const serverURL = "";

export default axios.create({
  baseURL: serverURL,
  headers: { "Content-type": "application/json" },
});
