import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const CaptainLogout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/captain/logout`,
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );

      if (response.status === 200) {
        localStorage.removeItem("token");
        navigate("/captain-login");
        toast.success("Captain Logged out");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Error logging out");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="absolute top-5 right-5 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
    >
      Logout
    </button>
  );
};

export default CaptainLogout;
