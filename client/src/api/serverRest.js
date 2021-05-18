import axios from "axios";

// just toggle between dev server and prod server
// const serverURL = "https://bears07chingu.herokuapp.com/";
const serverURL = "http://localhost:5000";

export default axios.create({
  baseURL: serverURL,
});
