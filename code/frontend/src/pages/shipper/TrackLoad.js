import axios from "axios";
import { Flex, Text } from "@chakra-ui/react";
import Sidebar from "../../components/sidebar/ShipperSideBar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function TrackLoad() {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/trackload", { withCredentials: true })
      .then((response) => {
        console.log("Track Load Fetched Successfully");
      })
      .catch((error) => {
        console.error("Error Fetching Track Load: ", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/login");
        }
      });
  }, [navigate]);
  return (
    <>
      <Flex>
        <Sidebar activePage="trackLoad" />
        <Flex flex="1" justifyContent="center">
          <Text>Track a Load</Text>
        </Flex>
      </Flex>
    </>
  );
}
