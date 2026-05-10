// Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [error, setError] = useState({});
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!values.email) {
      newErrors.email = "Email is required";
    }

    if (!values.password) {
      newErrors.password = "Password is required";
    }

    setError(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        values,
      );

      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError({
          email: "Email doesnot exist",
        });
      } else if (error.response && error.response.status === 401) {
        setError({
          password: "Password is not correct",
        });
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-white">Login</h2>
          <p className="text-gray-300 mt-2">Welcome back! Please login.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-gray-200 mb-2">Email</label>

            <input
              type="email"
              placeholder="Enter Email"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 transition"
              name="email"
              onChange={handleChanges}
            />
            {error.email && (
              <p className="text-red-500 text-sm mt-1">{error.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-200 mb-2">Password</label>

            <input
              type="password"
              placeholder="Enter Password"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 transition"
              name="password"
              onChange={handleChanges}
            />
            {error.password && (
              <p className="text-red-500 text-sm mt-1">{error.password}</p>
            )}
          </div>
          <div className="text-right mb-4">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              Forgot Password?
            </Link>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white py-3 rounded-xl font-semibold shadow-lg">
            Login
          </button>
        </form>

        <div className="text-center mt-6 text-gray-300">
          <span>Don't have an account? </span>

          <Link
            className="text-blue-400 hover:text-blue-300 font-semibold"
            to="/"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
