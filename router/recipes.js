const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { recipeController} = require('../controllers');

// middleware that is specific to this router

router.get('/', recipeController.getRecipes);
router.get('/top', recipeController.getTopRecipes);
router.post('/', auth(), recipeController.createRecipe);

router.get('/:recipeId', recipeController.getRecipe);
router.put('/like/:recipeId', auth(), recipeController.likeRecipe);
router.put('/dislike/:recipeId', auth(), recipeController.dislikeRecipe);
router.put('/:recipeId', auth(), recipeController.editRecipeInfo);
router.delete('/:recipeId', auth(), recipeController.deleteRecipe);

module.exports = router