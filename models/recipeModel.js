const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const recipeSchema = new mongoose.Schema({
    recipeName: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    products: {
        type: String,
        required: true
    },
    preparation: {
        type: String,
        required: true
    },
    userId: {
        type: ObjectId,
        ref: "User"
    },
    likes: [{
        type: ObjectId,
        ref: "User"
    }],
    likesCount: {
        type: Number
    },
    posts: [{
        type: ObjectId,
        ref: "Post"
    }],
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Recipe', recipeSchema);
