import mongoose from "mongoose";
import BrandModel from "../Models/Brand.model.js";
import { sendSuccessResponse } from "../Utils/SuccessResponse.utils.js";
import isValidObjectId from "../Utils/isValidObjectId.utils.js";



const createBrand = async (req, res) => {
  const { brandName, description } = req.body;

  // Ensure name is provided
  if (!brandName) {
    return res.status(400).json({ message: "Name is required" });
  }

  try {
    // Check for duplicate category name
    const existingBrand = await BrandModel.findOne({ brandName });
    if (existingBrand) {
      return res.status(400).json({ message: "Brand with this name already exists" });
    }

    // Create new category
    const newBrand = await BrandModel.create({ brandName, description });

    if (!newBrand) {
      return res.status(400).json({ message: "Failed to create Brand" });
    }

    // Return created category details
    // return res.status(201).json({
    //   message: "Category created successfully",
    //   category: newCategory,
    // });

    return sendSuccessResponse(res , 201 , "Brand created successfully" , 'newBrand' ,newBrand);

  } catch (error) {
    // Handle errors (e.g. database issues)
    return res.status(500).json({ message: error?.message || "Internal server error" });
  }
};


const getAllBrand = async (req, res) => {

  const brandList = await BrandModel.find();

  if (brandList.length <= 0) {
    return res.status(404).json({ message: 'there is no brandList' })
  }

  //return res.status(200).json({ message: 'brandList fetched successfully', data: brandList })
 
   return sendSuccessResponse(res , 200 , 'brandList fetched successfully' , 'brandlist', brandList  )

};


const updateBrand = async (req, res) => {

  const { brandId, brandName, description } = req.body;


  if (!brandId) {
    return res.status(404).json({ message: 'BrandId is empty' })
  }

  if (!isValidObjectId(brandId)) {
    return res.status(400).json({ message: 'Invalid brandId' });
  }

  const brand = await BrandModel.findById(brandId)

  if (!brand) {
    return res.status(404).json({ message: 'brand does not exist' })
  }

  try {

    const updatedBrand = await BrandModel.findByIdAndUpdate(
      brandId,
      {
        brandName: categoryName || category.brandName,
        description: description || category.description
      },
      { new: true } // This ensures that the updated document is returned
    );
    //return res.status(200).json({ message: 'brand updated successfully' })
    return sendSuccessResponse(res , 200 , 'brand updated successfully' , 'updatedBrand' , updatedBrand)

  } catch (error) {
    return res.status(500).json({ message: 'Error updating brand', error });
  }


}



const deleteBrand = async (req, res) => {

  const { brandId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(brandId)) {
    return res.status(400).json({ message: 'Invalid brandId' });
  }

  if (!isValidObjectId(brandId)) {
    return res.status(400).json({ message: 'Invalid brandId' });
  }

  if (!brandId) return res.status(404).json({ message: 'BrandId is empty' });
  
  try {
    
    await BrandModel.findByIdAndDelete(brandId)
    //return res.status(200).json({ message: 'Brand deleted successfully' })
    return sendSuccessResponse(res , 200 , 'Brand deleted successfully')

  } catch (error) {
    return res.status(500).json({ message: error?.message })
  }
}



export {
  createBrand,
  getAllBrand,
  updateBrand,
  deleteBrand,
}