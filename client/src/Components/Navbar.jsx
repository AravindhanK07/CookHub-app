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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <Link className="navbar-brand me-auto" to="/">
            COOK HUB
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
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
