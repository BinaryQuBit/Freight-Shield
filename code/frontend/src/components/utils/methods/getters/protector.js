// React Imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Axios Import
import axios from "axios";

// Custom Import
import { useData } from "./dataContext.js";

// Start of the Build
export default function Protector(path) {
  const { setData } = useData();
  const navigate = useNavigate();

  // Hook
  const [email, setEmail] = useState(null);

  useEffect(() => {
    axios
      .get(path, { withCredentials: true })
      .then((response) => {
        setData(response.data);
        setEmail(response.data.email);

        // Restriction if the forms are not complete
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

        // Restriction if status is Pending or Deactive for Carrier, Shipper, Admin
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

    // Active Load Listner and constructing mock data
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

            // Listening to shipper and mocking notification
          } else if (message.change && message.change.ns.coll === "shippers") {
            const { change } = message;
            if (change.shipperEmail && change.shipperEmail === email) {
              setData((prevData) => {
                let updatedNotifications = Array.isArray(prevData.notification)
                  ? [...prevData.notification]
                  : [];
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

    // Listening to marketplace and mocking data
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

            // listening to carrier and mocking notification
          } else if (message.change && message.change.ns.coll === "carriers") {
            const { change } = message;
            if (change.carrierEmail && change.carrierEmail === email) {
              setData((prevData) => {
                let updatedNotifications = Array.isArray(prevData.notification)
                  ? [...prevData.notification]
                  : [];
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

    // listening to shipper and mocking notification for all these pages
    if (
      path === "/api/shipperdashboard" ||
      path === "/api/postload" ||
      path === "/api/history" ||
      path === "/api/shippersettings"
    ) {
      const wsSocket = process.env.REACT_APP_WS_SOCKET;
      const ws = new WebSocket(wsSocket);
      ws.onerror = (error) => console.error("WebSocket error:", error);
      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          if (message.change && message.change.ns.coll === "shippers") {
            const { change } = message;
            if (change.shipperEmail && change.shipperEmail === email) {
              setData((prevData) => {
                let updatedNotifications = Array.isArray(prevData.notification)
                  ? [...prevData.notification]
                  : [];
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

    // listening to carrier and mocking notification for all these pages
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
          if (message.change && message.change.ns.coll === "carriers") {
            const { change } = message;
            if (change.carrierEmail && change.carrierEmail === email) {
              setData((prevData) => {
                let updatedNotifications = Array.isArray(prevData.notification)
                  ? [...prevData.notification]
                  : [];
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
    // listening to admin and mocking notification for all these pages
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
          if (message.change && message.change.ns.coll === "admins") {
            const { change } = message;
            if (change.adminEmail && change.adminEmail === email) {
              setData((prevData) => {
                let updatedNotifications = Array.isArray(prevData.notification)
                  ? [...prevData.notification]
                  : [];
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
}
