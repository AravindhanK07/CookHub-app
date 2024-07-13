import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./Pages/Home";
import { Auth } from "./Pages/Auth.js";
import { CreateRecipe } from "./Pages/Create-recipe";
import SavedRecipe from "./Pages/Saved-recipe";
import Navbar from "./Components/Navbar.jsx";
import "./App.css";
import { AnimatePresence, motion } from "framer-motion";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <AnimatedRoutes />
      </div>
    </Router>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/create-recipe" element={<CreateRecipe />}></Route>
        <Route path="/saved-recipes" element={<SavedRecipe />}></Route>
      </Routes>
    </AnimatePresence>
  );
};

export default App;
