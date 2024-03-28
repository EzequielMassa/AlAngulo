import { CategoryModel } from "../models/Category.model.js";

export const getAllCategories = async (req,res) => {
    try {
        const categories = await CategoryModel.find();
        if(!categories) {
            return res.status(404).json({message: "Category not found"})
        }
        return res.status(200).json({data: categories})
    } catch(error) {
        return res.status(500).json({message: error.message})
    }
};

export const createCategory = async (req,res) => {
    const { name, description } = req.body;
    try {
        const newCategory = await CategoryModel.create({name, description});
        return res.status(201).json({data: newCategory});
    } catch(error) {
        return res.status(500).json({message: error.message});
    }
}