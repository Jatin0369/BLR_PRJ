import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setError("Both fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}:${
          import.meta.env.VITE_PORT
        }/api/login`,
        { username, password }
      );

      // Check if login is successful
      if (response.data.success) {
        Cookies.set("username", username, { expires: 3 });

        navigate("/admin");
      } else {
        setError(response.data.error || "An error occurred during login.");
      }
    } catch (error) {
      alert(`Error occurred: ${error.response.data.error}`);
    }
  };

  return (
    <div className="login">
      <p className="login-heading">Login</p>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <label>User Name: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-container">
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="form-btn-container">
          <button type="submit" className="login-btn">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
