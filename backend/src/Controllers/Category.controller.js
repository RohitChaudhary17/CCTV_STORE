import CategoryModel from "../Models/Category.model.js";
import isValidObjectId from "../Utils/isValidObjectId.utils.js";
import { sendSuccessResponse } from "../Utils/SuccessResponse.utils.js";




const createCategory = async (req, res) => {
  const { categoryName, description } = req.body;

  // Ensure name is provided
  if (!categoryName) {
    return res.status(400).json({ message: "Name is required" });
  }

  try {
    // Check for duplicate category name
    const existingCategory = await CategoryModel.findOne({ categoryName });
    if (existingCategory) {
      return res.status(400).json({ message: "Category with this name already exists" });
    }

    // Create new category
    const newCategory = await CategoryModel.create({ categoryName, description });

    if (!newCategory) {
      return res.status(400).json({ message: "Failed to create category" });
    }

    return sendSuccessResponse(res , 201 , 'Category created successfully' , 'newCategory' , newCategory )


  } catch (error) {
    // Handle errors (e.g. database issues)
    return res.status(500).json({ message: error?.message || "Internal server error" });
  }
};



const getAllCategory = async (req, res) => {

  const categoryList = await CategoryModel.find();

  if (categoryList.length <= 0) {
    return res.status(404).json({ message: 'there is no category' })
  }

  return sendSuccessResponse(res , 200 , 'category fetched successfully' , 'categoryList' , categoryList )


};



const updateCategory = async (req, res) => {

  const { categoryId, categoryName, description } = req.body;

  if (!categoryId) {
    return res.status(404).json({ message: 'categoryId is empty' })
  }

  if (!isValidObjectId(categoryId)) {
    return res.status(400).json({ message: 'Invalid categoryId' });
  }

  const category = await CategoryModel.findById(categoryId)

  if (!category) {
    return res.status(404).json({ message: 'category does not exist' })
  }

  if(category.categoryName === categoryName){
    return res.status(404).json({ message: '' })
  }

  const CategoryToSave = {
    categoryName: categoryName || category.categoryName,
    description: description || category.description
  }

  try {
    
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      categoryId,
      { $set: CategoryToSave },
      { new: true } 
    );
    
     return sendSuccessResponse(res , 200 , 'category updated successfully' , 'updatedCategory' , updatedCategory )

  } catch (error) {
    return res.status(500).json({ message: 'Error updating category', error });
  }




}



const deletecategory = async (req, res) => {

  const { categoryId } = req.body;

  if (!categoryId) return res.status(404).json({ message: 'categoryId is empty' });

  if (!isValidObjectId(categoryId)) {
    return res.status(400).json({ message: 'Invalid categoryId' });
  }
  
  try {
    
    await CategoryModel.findByIdAndDelete(categoryId)
    return sendSuccessResponse(res , 200 , 'category deleted successfully' )

  } catch (error) {
    return res.status(500).json({ message: error?.message })
  }
}






export {
  createCategory,
  getAllCategory,
  updateCategory,
  deletecategory,
}