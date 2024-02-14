// Test to update name
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Protectors = (path) => {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(path, { withCredentials: true })
      .then((response) => {
        console.log(`${path} Page Fetched Successfully`);
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

export default Protectors;
