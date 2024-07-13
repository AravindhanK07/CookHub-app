import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { motion } from "framer-motion";

export const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "https://cookhub-app-backend.onrender.com/recipes",
        { ...recipe },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Recipe Created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div
      className="create-recipe"
      style={{ marginTop: "4rem" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <center>
        <h2>Create Recipe</h2>
      </center>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={recipe.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={recipe.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="ingredients">Ingredients</label>
          {recipe.ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              name="ingredients"
              className="form-control"
              value={ingredient}
              onChange={(event) => handleIngredientChange(event, index)}
            />
          ))}
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddIngredient}
          >
            Add Ingredient
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            className="form-control"
            value={recipe.instructions}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            className="form-control"
            value={recipe.imageUrl}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cookingTime">Cooking Time (minutes)</label>
          <input
            type="number"
            id="cookingTime"
            name="cookingTime"
            className="form-control"
            value={recipe.cookingTime}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Recipe
        </button>
      </form>
    </motion.div>
  );
};
