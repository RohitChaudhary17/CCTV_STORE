import router from 'express'
import { getAllProducts } from '../Controllers/Product.controller.js';

const productRouter = router();


productRouter.route('/get-all-product').get(getAllProducts)



export default productRouter