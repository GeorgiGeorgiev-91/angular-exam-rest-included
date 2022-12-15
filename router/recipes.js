const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { recipeController, postController } = require('../controllers');

// middleware that is specific to this router

router.get('/', recipeController.getRecipes);
router.get('/top', recipeController.getTopRecipes);
router.post('/', auth(), recipeController.createRecipe);

router.get('/:recipeId', recipeController.getRecipe);
router.post('/:recipeId', auth(), postController.createPost);
router.put('/:recipeId', auth(), recipeController.editRecipeInfo);
router.put('/:recipeId/posts/:postId', auth(), postController.editPost);
router.delete('/:recipeId/posts/:postId', auth(), postController.deletePost);

module.exports = router