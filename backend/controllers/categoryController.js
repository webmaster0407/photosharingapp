const Category = require('../models/Category'); 

exports.getAllCategories = async (req, res) => {
    try {
        const allCategories = await Category.find({})

        res.status(200).json({
            status: 'success',
            allCategories
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            category
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.addCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);

        res.status(201).json({
            status: 'success',
            category
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            status: req.body.status
        }, { new: true });

        res.status(200).json({
            status: 'success',
            category
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: 'success',
            deletedCategory
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};