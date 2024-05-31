import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { Auth } from "./Pages/Auth.js";
import { CreateRecipe } from "./Pages/Create-recipe";
import Savedrecipe from "./Pages/Saved-recipe";
import Navbar from "./Components/Navbar.jsx";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/auth" element={<Auth />}></Route>
            <Route path="/create-recipe" element={<CreateRecipe />}></Route>
            <Route path="/saved-recipes" element={<Savedrecipe />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
