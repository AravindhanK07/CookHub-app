import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          COOK HUB
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse" // Use 'data-bs-toggle' instead of 'data-toggle'
          data-bs-target="#navbarNav" // Ensure this matches the ID of the collapsible element
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            {cookies.access_token && (
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
            )}
            {cookies.access_token && ( // Only show if user is logged in
              <li className="nav-item">
                <Link className="nav-link" to="/create-recipe">
                  Create Recipe
                </Link>
              </li>
            )}
            {cookies.access_token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/saved-recipes">
                    Saved Recipes
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-primary" onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-outline-primary" to="/auth">
                  Login/Register
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
