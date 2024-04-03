import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useData } from "./dataContext.js";

const Protector = (path) => {
  const { setData } = useData();
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  useEffect(() => {
    axios
      .get(path, { withCredentials: true })
      .then((response) => {
        setData(response.data);
        setEmail(response.data.email);
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
        } else if (error.response && error.response.status === 604) {
          navigate("/adminsettings");
        } else if (error.response && error.response.status === 605) {
          navigate("/carriersettings");
        } else if (error.response && error.response.status === 606) {
          navigate("/shippersettings");
        }
      });
    if (path === "/api/activeloads") {
      const wsSocket = process.env.REACT_APP_WS_SOCKET;
      const ws = new WebSocket(wsSocket);
      ws.onerror = (error) => console.error("WebSocket error:", error);
      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          if (message.change && message.change.ns.coll === "marketplaces") {
            setData((prevData) => {
              let updatedLoads = [...prevData.loads];
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
                  if (message.change.fullDocument.shipperEmail === email) {
                    if (
                      !updatedLoads.some(
                        (item) => item._id === change.fullDocument._id
                      )
                    ) {
                      updatedLoads = [...updatedLoads, change.fullDocument];
                    }
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
    if (path === "/api/marketplace") {
      const wsSocket = process.env.REACT_APP_WS_SOCKET;
      const ws = new WebSocket(wsSocket);
      ws.onerror = (error) => console.error("WebSocket error:", error);
      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          if (message.change && message.change.ns.coll === "marketplaces") {
            setData((prevData) => {
              let updatedLoads = [...prevData.loads];
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
                    updatedLoads = [...updatedLoads, change.fullDocument];
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
    if (
      path === "/api/shipperdashboard" ||
      path === "/api/postload" ||
      path === "/api/history" ||
      path === "/api/shippersettings" ||
      path === "/api/activeloads"
    ) {
      const wsSocket = process.env.REACT_APP_WS_SOCKET;
      const ws = new WebSocket(wsSocket);
      ws.onerror = (error) => console.error("WebSocket error:", error);
      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          console.log("This is message", message);
          if (message.change && message.change.ns.coll === "shippers") {
            const { change } = message;
            console.log("This is change", change);
            console.log("This is email from backend", change.shipperEmail);
            console.log("This is email from front end", email);
            if (change.shipperEmail && change.shipperEmail === email) {
              setData((prevData) => {
                let updatedNotifications = Array.isArray(prevData.notification)
                  ? [...prevData.notification]
                  : [];
                console.log("This is prev noti", updatedNotifications);
                switch (change.operationType) {
                  case "update":
                    const updates = change.updateDescription.updatedFields;
                    if ("notification" in updates) {
                      updatedNotifications = updates.notification;
                    } else {
                      for (const key in updates) {
                        if (key.startsWith("notification.")) {
                          const index = parseInt(key.split(".")[1], 10);
                          while (updatedNotifications.length <= index) {
                            updatedNotifications.push(null);
                          }
                          updatedNotifications[index] = {
                            ...(updatedNotifications[index] || {}),
                            ...updates[key],
                          };
                        }
                      }
                    }
                    console.log("Updated notifications:", updatedNotifications);
                    break;
                  default:
                    break;
                }
                return { ...prevData, notification: updatedNotifications };
              });
            }
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };
      return () => {
        ws.close();
      };
    }
    if (
      path === "/api/carrierdashboard" ||
      path === "/api/myloads" ||
      path === "/api/driverprofiles" ||
      path === "/api/unitprofiles" ||
      path === "/api/carriersettings"
    ) {
      const wsSocket = process.env.REACT_APP_WS_SOCKET;
      const ws = new WebSocket(wsSocket);
      ws.onerror = (error) => console.error("WebSocket error:", error);
      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          console.log("This is message", message);
          if (message.change && message.change.ns.coll === "carriers") {
            const { change } = message;
            console.log("This is change", change);
            console.log("This is email from backend", change.carrierEmail);
            console.log("This is email from front end", email);
            if (change.carrierEmail && change.carrierEmail === email) {
              setData((prevData) => {
                let updatedNotifications = Array.isArray(prevData.notification)
                  ? [...prevData.notification]
                  : [];
                console.log("This is prev noti", updatedNotifications);
                switch (change.operationType) {
                  case "update":
                    const updates = change.updateDescription.updatedFields;
                    if ("notification" in updates) {
                      updatedNotifications = updates.notification;
                    } else {
                      for (const key in updates) {
                        if (key.startsWith("notification.")) {
                          const index = parseInt(key.split(".")[1], 10);
                          while (updatedNotifications.length <= index) {
                            updatedNotifications.push(null);
                          }
                          updatedNotifications[index] = {
                            ...(updatedNotifications[index] || {}),
                            ...updates[key],
                          };
                        }
                      }
                    }
                    console.log("Updated notifications:", updatedNotifications);
                    break;
                  default:
                    break;
                }
                return { ...prevData, notification: updatedNotifications };
              });
            }
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };
      return () => {
        ws.close();
      };
    }
    if (
      path === "/api/administrators" ||
      path === "/api/shippers" ||
      path === "/api/carriers" ||
      path === "/api/adminsettings"
    ) {
      const wsSocket = process.env.REACT_APP_WS_SOCKET;
      const ws = new WebSocket(wsSocket);
      ws.onerror = (error) => console.error("WebSocket error:", error);
      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          console.log("This is message", message);
          if (message.change && message.change.ns.coll === "admins") {
            const { change } = message;
            console.log("This is change", change);
            console.log("This is email from backend", change.adminEmail);
            console.log("This is email from front end", email);
            if (change.adminEmail && change.adminEmail === email) {
              setData((prevData) => {
                let updatedNotifications = Array.isArray(prevData.notification)
                  ? [...prevData.notification]
                  : [];
                console.log("This is prev noti", updatedNotifications);
                switch (change.operationType) {
                  case "update":
                    const updates = change.updateDescription.updatedFields;
                    if ("notification" in updates) {
                      updatedNotifications = updates.notification;
                    } else {
                      for (const key in updates) {
                        if (key.startsWith("notification.")) {
                          const index = parseInt(key.split(".")[1], 10);
                          while (updatedNotifications.length <= index) {
                            updatedNotifications.push(null);
                          }
                          updatedNotifications[index] = {
                            ...(updatedNotifications[index] || {}),
                            ...updates[key],
                          };
                        }
                      }
                    }
                    console.log("Updated notifications:", updatedNotifications);
                    break;
                  default:
                    break;
                }
                return { ...prevData, notification: updatedNotifications };
              });
            }
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };
      return () => {
        ws.close();
      };
    }
  }, [navigate, path, email, setData]);
  return null;
};
export default Protector;
