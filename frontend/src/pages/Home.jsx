// Home.jsx
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:3000/auth/home", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 201) {
        navigate("/login");
      }
    } catch (err) {
      navigate("/login");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-10 w-full max-w-lg text-center">
        <h1 className="text-5xl font-extrabold text-white mb-4">
          Welcome Home
        </h1>

        <p className="text-gray-300 text-lg">
          You have successfully logged in.
        </p>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="mt-8 px-6 py-3 bg-red-500 hover:bg-red-600 transition-all duration-300 rounded-xl text-white font-semibold shadow-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;