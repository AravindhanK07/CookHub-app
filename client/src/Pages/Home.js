import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
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
      const response = await axios.put("http://localhost:3001/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.error(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Recipes</h1>
      <div className="row">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="col-md-4 mb-4">
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
    </div>
  );
};

export default Home;
