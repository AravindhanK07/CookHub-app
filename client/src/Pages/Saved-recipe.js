import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { motion } from "framer-motion";

const Savedrecipe = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSavedRecipe();
  }, [userID]);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3000/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.error(err);
    }
  };

  const isRecipeSaved = (id) =>
    savedRecipes.some((recipe) => recipe._id === id);

  return (
    <motion.div
      className="container"
      style={{ marginTop: "4rem" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-center mb-4">Saved Recipes</h1>
      <div className="row">
        {savedRecipes.map((recipe) => (
          <div className="col-12 mb-4" key={recipe._id}>
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
                <p className="card-text">
                  Cooking Time: {recipe.cookingTime} minutes
                </p>
                {/*<button
                  onClick={() => saveRecipe(recipe._id)}
                  disabled={isRecipeSaved(recipe._id)}
                  className="btn btn-primary"
                >
                  {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                </button>*/}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Savedrecipe;
