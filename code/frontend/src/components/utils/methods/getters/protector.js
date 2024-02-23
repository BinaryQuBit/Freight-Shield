import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useData } from "./dataContext.js"

const Protector = (path) => {
  const { setData } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(path, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setData(response.data); 
        console.log(`${path} Page Fetched Successfully`);
        if ((path === "/api/shippercontactdetails" && response.data.areContactDetailsComplete) ||
            (path === "/api/shipperbusinessdetails" && response.data.areBusinessDetailsComplete) ||
            (path === "/api/shippersubmission" && response.data.isFormComplete) ||
            (path === "/api/carriercontactdetails" && response.data.areContactDetailsComplete) ||
            (path === "/api/carrierbusinessdetails" && response.data.areBusinessDetailsComplete) ||
            (path === "/api/carriersubmission" && response.data.isFormComplete)
            ) {
          navigate('/');
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
  }, [navigate, path]);
}

export default Protector;

