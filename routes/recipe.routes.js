// https://api.spoonacular.com/recipes/complexSearch?apiKey=17be99a7ad524f6eaf2e4da9306f6427&query=Rice&cuisine=american
const { default: axios } = require('axios');
const express=require('express');
const { RecipeModel } = require('../model/recipe.model');
const recipeRouter=express.Router()
require('dotenv').config()
// const API = 'https://api.spoonacular.com/recipes';
const key = "10f1f1df1f984a679ca56831956747fb";

/**Search Recipes */
recipeRouter.get("/search",async(req,res)=>{
    // console.log("req.query:",req.query.query)
    try {
        const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
          params: {
            apiKey: key,
            query: req.query.query, 
          },
        });
        console.log("response:",response.data.results)
        res.status(200).send({"msg":`Getting Item related to ${req.query.query}`,"Data":response.data.results});
      } catch (error) {
        res.status(500).status(200).send({ error: 'Failed to fetch recipes as per your search' });
      }
})


// Saved recipe
recipeRouter.post("/saved", async (req, res) => {
    const { userId, recipeId, title, image } = req.body;
    try {
        // Check if the recipe is already saved by the user, and if not, save it
        const existingRecipe = await RecipeModel.findOne({ userId, recipeId });
        if (!existingRecipe) {
            const savedRecipe = new RecipeModel({ userId, recipeId, title, image });
            await savedRecipe.save();
            res.status(200).json({ msg: 'Recipe saved successfully', data: savedRecipe });
        } else {
            res.status(200).json({ msg: 'Recipe is already saved by the user' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save the recipe' });
    }
});


//Get Saved data
recipeRouter.get("/saved", async (req, res) => {
  const { userId } = req.query;

  try {
      const savedRecipes = await RecipeModel.find({ userId });
      if (savedRecipes.length === 0) {
          return res.status(404).send({ msg: 'No saved recipes found for the user' });
      }
      res.status(200).json({ msg: 'Saved recipes retrieved successfully', data: savedRecipes });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve saved recipes' });
  }
});


module.exports={
    recipeRouter
}
