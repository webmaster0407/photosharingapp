const mongoose = require('mongoose');
 
const CategorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        default: true
    }

}, {versionKey: false});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;