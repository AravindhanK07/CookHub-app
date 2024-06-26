import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  return (
    <div className="auth">
      <AuthForm />
    </div>
  );
};

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleSwitch = () => {
    setIsLogin((prev) => !prev);
    setUsername(""); // Reset username state
    setPassword(""); // Reset password state
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (isLogin) {
        const result = await axios.post("http://localhost:3000/auth/login", {
          username,
          password,
        });

        setCookies("access_token", result.data.token);
        window.localStorage.setItem("userID", result.data.userID);
        navigate("/");
      } else {
        await axios.post("http://localhost:3000/auth/register", {
          username,
          password,
        });
        alert("Registration Completed! Now login.");
        setIsLogin(true);
        setUsername(""); // Reset username state
        setPassword(""); // Reset password state
      }
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        if (data.error) {
          alert(data.error); // Show error message from the server
        } else {
          alert("An error occurred. Please try again."); // Default error message
        }
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="auth-container">
      <div>
        <form onSubmit={handleSubmit}>
          <h2>{isLogin ? "Login" : "Register"}</h2>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              className="form-control smaller-input" // Added class "smaller-input"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              className="form-control smaller-input" // Added class "smaller-input"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p className="d-flex align-items-center">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button type="button" className="btn btn-link" onClick={handleSwitch}>
            {isLogin ? "Register here" : "Login here"}
          </button>
        </p>
      </div>
    </div>
  );
};
