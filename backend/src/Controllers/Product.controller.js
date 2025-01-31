import ProductModel from "../Models/Product.model.js";

const getAllProducts = async (req, res) => {
  try {
    // Await the result of find() to get all products
    const all_Products = await ProductModel.find();

    // Log the result to check for circular structures
    console.log(all_Products);

    // If no products are found, return an empty array or a suitable message
    if (all_Products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    // Send the products in the response
    return res.status(200).json({ products: all_Products });
  } catch (error) {
    // Handle errors (e.g., database issues)
    return res.status(500).json({ message: error.message || "Internal server error" });
  }
};



const addProduct = async (req, res) => {
  
const {name , description , price , stock , category ,brand} = req.body;

if(!name || !description || !price || !stock || !category || !brand){
  return res.status(404).json({ message: "all field is require" });
}



}



export{
  getAllProducts,
  addProduct,
}
