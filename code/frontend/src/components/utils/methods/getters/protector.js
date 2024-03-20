import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useData } from "./dataContext.js";

const Protector = (path) => {
  const { setData } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(path, { withCredentials: true })
      .then((response) => {
        setData(response.data);
        console.log(`${path} Page Fetched Successfully`);
        console.log("Response Data", response.data);
        if (
          (path === "/api/shippercontactdetails" &&
            response.data.areContactDetailsComplete) ||
          (path === "/api/shipperbusinessdetails" &&
            response.data.areBusinessDetailsComplete) ||
          (path === "/api/shippersubmission" && response.data.isFormComplete) ||
          (path === "/api/carriercontactdetails" &&
            response.data.areContactDetailsComplete) ||
          (path === "/api/carrierbusinessdetails" &&
            response.data.areBusinessDetailsComplete) ||
          (path === "/api/carriersubmission" && response.data.isFormComplete)
        ) {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error(`Error Fetching ${path} Page: `, error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/login");
        }
      });
    if (path === "/api/activeloads") {
      const wsSocket = process.env.REACT_APP_WS_SOCKET;
      const ws = new WebSocket(wsSocket);

      ws.onopen = () => console.log("WebSocket connected");
      ws.onerror = (error) => console.error("WebSocket error:", error);
      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          if (message.change && message.change.ns.coll === "marketplaces") {
            setData((prevData) => {
              const updatedLoads = [...prevData.loads];
              const { change } = message;

              switch (change.operationType) {
                case "update":
                  const updatedItemIndex = updatedLoads.findIndex(
                    (item) => item._id === change.documentKey._id
                  );
                  if (updatedItemIndex !== -1) {
                    updatedLoads[updatedItemIndex] = {
                      ...updatedLoads[updatedItemIndex],
                      ...change.updateDescription.updatedFields,
                    };
                  }
                  break;
                case "insert":
                  if (
                    !updatedLoads.some(
                      (item) => item._id === change.fullDocument._id
                    )
                  ) {
                    updatedLoads.push(change.fullDocument);
                  }
                  break;
                case "delete":
                  updatedLoads = updatedLoads.filter(
                    (item) => item._id !== change.documentKey._id
                  );
                  break;
                default:
                  break;
              }

              return { ...prevData, loads: updatedLoads };
            });
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      return () => {
        ws.close();
      };
    }
  }, [navigate, path, setData]);

  return null;
};

export default Protector;

// if (path === "/api/marketplace") {
//   const wsSocket = process.env.REACT_APP_WS_SOCKET;
//   const ws = new WebSocket(wsSocket);

//   ws.onopen = () => console.log("WebSocket connected");
//   ws.onerror = (error) => console.error("WebSocket error:", error);
//   ws.onmessage = (event) => {
//     try {
//       const message = JSON.parse(event.data);
//       if (message.change && message.change.ns.coll === "marketplaces") {
//         setData((prevData) => {
//           let updatedData = {...prevData};
//           console.log("updatedData", updatedData);
//           console.log("prevData", prevData);
//           const { change } = message;

//           switch (change.operationType) {
//             case "update":
//               const updatedItemIndex = updatedData.loads.findIndex(
//                 (item) => item._id === change.documentKey._id
//               );
//               if (updatedItemIndex !== -1) {
//                 updatedData.loads[updatedItemIndex] = {
//                   ...updatedData.loads[updatedItemIndex],
//                   ...change.updateDescription.updatedFields,
//                 };
//               }
//               break;
//               case "insert":
//                 const existingItemIndex = updatedData.loads.findIndex(
//                     (item) => item._id.toString() === change.fullDocument._id.toString()
//                 );
//                 if (existingItemIndex === -1) {
//                     updatedData.loads.push(change.fullDocument);
//                 }
//                 break;
//             case "delete":
//               updatedData = updatedData.filter(item => item._id !== change.documentKey._id);
//               break;
//             default:
//               break;
//           }

//           return updatedData;
//         });
//       }
//     } catch (error) {
//       console.error("Error parsing WebSocket message:", error);
//     }
//   };
//   return () => {
//     ws.close();
//   };
// }
