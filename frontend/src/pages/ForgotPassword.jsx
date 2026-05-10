import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        "http://localhost:3000/auth/forgot-password",
        {
          email,
          password,
        },
      );

      setMessage(response.data.message);
      setError("");
      setTimeout(() => {
        navigate("/login");
      }, 500);
    } catch (error) {
      setMessage("");

      if (error.response) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-900">
      <div className="bg-white/10 p-8 rounded-2xl w-96">
        <h2 className="text-white text-3xl font-bold mb-6 text-center">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full mb-4 p-3 rounded bg-white/10 text-white border border-white/20"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter New Password"
            className="w-full mb-4 p-3 rounded bg-white/10 text-white border border-white/20"
            onChange={(e) => setPassword(e.target.value)}
          />

          {message && <p className="text-green-400 mb-3">{message}</p>}

          {error && <p className="text-red-400 mb-3">{error}</p>}

          <button className="w-full bg-blue-600 py-3 rounded text-white">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
