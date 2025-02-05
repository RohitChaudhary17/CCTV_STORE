import BrandModel from "../Models/Brand.model.js";
import CategoryModel from "../Models/Category.model.js";
import ProductModel from "../Models/Product.model.js";
import CreateProductService from "../Services/CreateProduct.service.js";
import isValidObjectId from "../Utils/isValidObjectId.utils.js";
import { sendSuccessResponse } from "../Utils/SuccessResponse.utils.js";





const addProduct = async (req, res) => {

  const { productName, description, price, stock, category, brand, color } = req.body;

  try {
    if (!productName || !description || !price || !stock || !category || !brand) {
      return res.status(404).json({ message: "all field is require" });
    }

    const existingProduct = await ProductModel.findOne({ productName });

    if (existingProduct) {
      return res.status(401).json({ message: 'productName is already exist' })
    }

    const existingCategory = await CategoryModel.findById(category)
    if (!existingCategory) return res.status(404).json({ message: 'Category is not exist' })

    const existingBrand = await BrandModel.findById(brand)
    if (!existingBrand) return res.status(404).json({ message: 'Brand is not exist' })

    const newProduct = await CreateProductService(productName, description, price, stock, category, brand, color)

    //return res.status(201).json({ message: 'product created successfully', data: product })

    return sendSuccessResponse(res, 201 , 'product created successfully' , 'newProduct' , newProduct )

  } catch (error) {
    return res.status(500).json({ message: error?.message })
  }

}



const getAllProducts = async (req, res) => {
  try {
    // Await the result of find() to get all products
    const productList = await ProductModel.find();

    // Log the result to check for circular structures
    console.log(productList);

    // If no products are found, return an empty array or a suitable message
    if (productList.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    // Send the products in the response
   // return res.status(200).json({ products: all_Products });

   return sendSuccessResponse(res, 200 , 'product fetched successfully' , 'productList' , productList)

  } catch (error) {
    // Handle errors (e.g., database issues)
    return res.status(500).json({ message: error.message || "Internal server error" });
  }
};



const updateProductDetails = async (req, res) => {
  const { productId, productName, description, price, stock,  color } = req.body;

  if (!productId) {
    return res.status(404).json({ message: 'productId is empty' });
  }

  if (!isValidObjectId(productId)) {
    return res.status(400).json({ message: 'Invalid productId' });
  }

  const product = await ProductModel.findById(productId);

  if (!product) {
    return res.status(404).json({ message: 'product does not exist' });
  }

  const productToSave = {
    productName: productName || product.productName,
    description: description || product.description,
    price: price || product.price,
    stock: stock || product.stock,
    // category: category || product.category,
    // brand: brand || product.brand,
    color: color || product.color,
  };

  try {
    // Update the product
    const updatedProduct = await ProductModel.findByIdAndUpdate(productId, { $set: productToSave } , {new:true});

    // Return success response
    // return res.status(200).json({ message: 'Product updated successfully' });

    return sendSuccessResponse(res, 200 , 'Product updated successfully' , 'updatedProduct' , updatedProduct)

  } catch (error) {
    return res.status(500).json({ message: 'Error updating product', error });
  }
};



const deleteProduct = async (req, res) => {

  const { productId } = req.body;

  if (!productId) return res.status(404).json({ message: 'productId is empty' });

  if (!isValidObjectId(productId)) {
    return res.status(400).json({ message: 'Invalid productId' });
  }

  try {

    await ProductModel.findByIdAndDelete(productId)
    //return res.status(200).json({ message: 'product deleted successfully' })
    return sendSuccessResponse(res, 200 , 'product deleted successfully')
    
  } catch (error) {
    return res.status(500).json({ message: error?.message })
  }


}










export {
  addProduct,
  getAllProducts,
  updateProductDetails,
  deleteProduct,
}
