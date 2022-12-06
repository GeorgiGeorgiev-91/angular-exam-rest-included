const { recipeModel } = require('../models');
const { newPost } = require('./postController')

function getRecipes(req, res, next) {
    recipeModel.find()
        .populate('userId')
        .then(recipes => res.json(recipes))
        .catch(next);
}

function getTopRecipes(req, res, next) {
    recipeModel.find()
        .sort({ likesCount: -1 }).limit(4)
        .populate('userId')
        .then(recipes => res.json(recipes))
        .catch(next);
}

function getRecipe(req, res, next) {
    const { recipeId } = req.params;

    recipeModel.findById(recipeId)
        .populate({
            path : 'posts',
            populate : {
              path : 'userId'
            }
          })
        .then(recipe => res.json(recipe))
        .catch(next);
}

function createRecipe(req, res, next) {
    const { recipeName, postText } = req.body;
    const { _id: userId } = req.user;

    recipeModel.create({ recipeName, userId, subscribers: [userId] })
        .then(recipe => {
            newPost(postText, userId, recipe._id)
                .then(([_, updatedRecipe]) => res.status(200).json(updatedRecipe))
        })
        .catch(next);
}

function subscribe(req, res, next) {
    const recipeId = req.params.recipeId;
    const { _id: userId } = req.user;
    recipeModel.findByIdAndUpdate({ _id: recipeId }, { $addToSet: { subscribers: userId } }, { new: true })
        .then(updatedRecipe => {
            res.status(200).json(updatedRecipe)
        })
        .catch(next);
}

module.exports = {
    getRecipes,
    createRecipe,
    getRecipe,
    subscribe,
    getTopRecipes
}
