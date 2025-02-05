import BrandModel from "../Models/Brand.model.js";
import CategoryModel from "../Models/Category.model.js";
import ProductModel from "../Models/Product.model.js"



const CreateProductService = async (productName , description , price , stock , category ,brand , color) => {

const newProduct = await ProductModel.create({
  productName,
  description,
  price,
  stock,
  category,
  brand,
  color : color ? color : 'black' 
}) 

return newProduct



}

export default CreateProductService