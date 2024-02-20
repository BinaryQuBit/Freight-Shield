// Test to update name
import axios from "axios";

const logout = (navigate) => {
  axios
    .get("/logout", { withCredentials: true })
    .then(() => {
      navigate("/login");
    })
    .catch((error) => {
      console.error("Logout failed:", error);
    });
};

export default logout;

   
