const { recipeModel } = require('../models');
const { newPost } = require('./postController')

function getRecipes(req, res, next) {
    recipeModel.find()
        .populate('userId')
        .then(recipes => res.json(recipes))
        .catch(next);
}

// function getRecipes(req, res, next) {
//     let perPage = 6;
//     let total = recipeModel.count();
//     let pages = Math.ceil(total/perPage);
//     console.log(req.query);
//     let pageNumber = (req.query.page == null) ? 1 : req.query.page;
//     let startFrom = (pageNumber - 1) * perPage;
    
//     recipeModel.find({})
//         .skip(startFrom)
//         .limit(perPage)
//         .populate('userId')
//         .then(recipes => res.json(recipes))
//         .catch(next);
// }

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
        .populate('userId')
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
    const { recipeName, imgUrl, category, products, preparation } = req.body;
    const { _id: userId } = req.user;
    const likesCount = 0;

    recipeModel.create({ recipeName, imgUrl, category, products, preparation, userId, likesCount })
    .then(recipe => {
        if (recipe) {
            res.status(200).json(recipe);
        } else {
            res.status(401).json({ message: `Not allowed!` });
        }
        // newPost(postText, userId, recipe._id)
        //     .then(([_, updatedRecipe]) => res.status(200).json(updatedRecipe))
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

function editRecipeInfo(req, res, next) {
    const _id  = req.params.recipeId;
    const { recipeName, imgUrl, category, products, preparation } = req.body;

    recipeModel.findOneAndUpdate({ _id }, { recipeName, imgUrl, category, products, preparation }, { runValidators: true, new: true })
        .then(x => { res.status(200).json(x) })
        .catch(next);
}

module.exports = {
    getRecipes,
    createRecipe,
    getRecipe,
    subscribe,
    getTopRecipes,
    editRecipeInfo
}
