import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import { motion } from "framer-motion";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();
  const [cookies, setCookies] = useCookies(["access_token"]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          "https://cookhub-app-backend.onrender.com/recipes"
        );
        setRecipes(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `https://cookhub-app-backend.onrender.com/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecipe();
    fetchSavedRecipe();
  }, [userID]);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        "https://cookhub-app-backend.onrender.com/recipes",
        {
          recipeID,
          userID,
        }
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.error(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <motion.div
      className="container"
      style={{ marginTop: "4rem" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-center mb-4">
        {cookies.access_token ? "Recipes" : "Login to explore the recipes!!"}
      </h1>
<<<<<<< HEAD
      {cookies.access_token && (
        <div className="row">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="col-12 mb-4">
              <div className="card">
                <img
                  src={recipe.imageUrl}
                  className="card-img-top"
                  alt={recipe.name}
                />
                <div className="card-body">
                  <h2 className="card-title">{recipe.name}</h2>
                  <h5>Ingredients:</h5>
                  <ul className="list-unstyled">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                  <h5>Instructions:</h5>
                  <p className="card-text">{recipe.instructions}</p>
                  <p className="card-text font-weight-bold">
                    Cooking Time: {recipe.cookingTime} minutes
                  </p>
                  <button
                    onClick={() => saveRecipe(recipe._id)}
                    disabled={isRecipeSaved(recipe._id)}
                    className="btn btn-primary"
                  >
                    {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
=======
      {cookies.access_token && (<div className="row">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="col-12 mb-4">
            <div className="card">
              <img
                src={recipe.imageUrl}
                className="card-img-top"
                alt={recipe.name}
              />
              <div className="card-body">
                <h2 className="card-title">{recipe.name}</h2>
                <h5>Ingredients:</h5>
                <ul className="list-unstyled">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <h5>Instructions:</h5>
                <p className="card-text">{recipe.instructions}</p>
                <p className="card-text font-weight-bold">
                  Cooking Time: {recipe.cookingTime} minutes
                </p>
                <button
                  onClick={() => saveRecipe(recipe._id)}
                  disabled={isRecipeSaved(recipe._id)}
                  className="btn btn-primary"
                >
                  {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>)}
>>>>>>> 9fbc4162e360018c3b3c7dc5363bbf9d024574ae
    </motion.div>
  );
};

export default Home;
