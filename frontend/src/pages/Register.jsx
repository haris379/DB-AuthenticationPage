// Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [error, setError] = useState({});
  const [values, setValues] = useState({
    username: "",
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
    if (!values.username) {
      newErrors.username = "Username is required";
    }

    if (!values.email) {
      newErrors.email = "Email is required";
    }

    if (!values.password) {
      newErrors.password = "Password is required";
    } else if (values.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setError(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        values,
      );

          if (response.status === 201) {
            navigate("/login");
          }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError({
          email: "Email already exist",
        });
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-white">Register</h2>

          <p className="text-gray-300 mt-2">Create your new account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-gray-200 mb-2">Username</label>

            <input
              type="text"
              placeholder="Enter Username"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500 transition"
              name="username"
              onChange={handleChanges}
            />

            {error.username && (
              <p className="text-red-500 text-sm mt-1">{error.username}</p>
            )}
          </div>

          <div className="mb-5">
            <label className="block text-gray-200 mb-2">Email</label>

            <input
              type="email"
              placeholder="Enter Email"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500 transition"
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
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500 transition"
              name="password"
              onChange={handleChanges}
            />
            {error.password && (
              <p className="text-red-500 text-sm mt-1">{error.password}</p>
            )}
          </div>

          <button className="w-full bg-purple-600 hover:bg-purple-700 transition-all duration-300 text-white py-3 rounded-xl font-semibold shadow-lg">
            Register
          </button>
        </form>

        <div className="text-center mt-6 text-gray-300">
          <span>Already have an account? </span>

          <Link
            className="text-purple-400 hover:text-purple-300 font-semibold"
            to="/login"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
