import axios from "axios";

// just toggle between dev server and prod server
// const serverURL = "https://bears07chingu.herokuapp.com/";
const serverURL = "https://bears07chingu.herokuapp.com/";

export default axios.create({
  baseURL: serverURL,
});
