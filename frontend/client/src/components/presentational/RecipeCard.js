import React, { Component } from "react";
import "../../assets/styles/Recipe.css";

const RecipeCard = ({ name, directions, ingredients }) => {
  return (
    <div className="recipeCard">
      <h3>{name}</h3> 
      <h5>Ingredients</h5>
      <ol type="1">
        {ingredients.map((item, i) => {
          return (
            <li key={i} style={{ display: "list-item" }}>{item}</li>
          );
        })}
      </ol>
      <h5>Directions</h5>
      <ol type="1">
        {directions.map((item, i) => {
          return (
            <li key={i} style={{ display: "list-item" }}>{item}</li>
          );
        })}
      </ol>
    </div>
  );
};

export default RecipeCard;
