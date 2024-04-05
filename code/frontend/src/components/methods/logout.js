// Axios Import
import axios from "axios";

// Start of the Build
export default function logout(navigate, setColorMode) {
  axios
    .get("/logout", { withCredentials: true })
    .then(() => {
      navigate("/login");
    })
    .catch((error) => {
      console.error("Logout failed:", error);
    });
}
