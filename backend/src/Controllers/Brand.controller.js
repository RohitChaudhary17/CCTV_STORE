import BrandModel from "../Models/Brand.model.js";




const createBrand = async (req, res) => {
  const { name, description } = req.body;

  // Ensure name is provided
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  try {
    // Check for duplicate category name
    const existingCategory = await BrandModel.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category with this name already exists" });
    }

    // Create new category
    const newCategory = await BrandModel.create({ name, description });

    if (!newCategory) {
      return res.status(400).json({ message: "Failed to create category" });
    }

    // Return created category details
    return res.status(201).json({
      message: "Category created successfully",
      category: newCategory,
    });

  } catch (error) {
    // Handle errors (e.g. database issues)
    return res.status(500).json({ message: error?.message || "Internal server error" });
  }
};



export{
  createBrand,
}