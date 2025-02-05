import router from 'express'
import { addProduct, deleteProduct, getAllProducts, updateProductDetails } from '../Controllers/Product.controller.js';
import VerifyJWT from '../Middlewares/Auth.middleware.js';
import IsAdmin from '../Middlewares/IsAdmin.middleware.js';

const productRouter = router();



// route open for all
productRouter.route('/get-all-product').get(getAllProducts)



// admin protected routes
productRouter.route('/add-product').post(VerifyJWT, IsAdmin, addProduct)
productRouter.route('/update-product').patch(VerifyJWT, IsAdmin, updateProductDetails)
productRouter.route('/delete-product').delete(VerifyJWT, IsAdmin, deleteProduct)



export default productRouter