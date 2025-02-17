import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
    }

    // Profile is fetched here as user and captain both will save token in localStorage so as to prevent unauthorized access of user as captain we will fetch the captainProfile and if the token authenticates for captain profile then we let he user log in as captain
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        if (response.status === 201) {
          setCaptain(response.data.captain);
          setIsLoading(false);
        }
      })
      .catch(err => {
        // if token not validated as captain then error and back to login
        console.log(err);
        localStorage.removeItem("token"); //token removed
        navigate("/captain-login");
      });
  }, [token]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
        <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-3 text-yellow-400 text-sm">
          Authenticating Captain...
        </p>
      </div>
    );
  }

  return (<div>{children}</div>);
};

export default CaptainProtectWrapper;

/*
If the user is logged in  then the children components will be rendered otherwise login page will be displayed
*/
