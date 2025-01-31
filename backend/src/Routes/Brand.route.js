import router from 'express'
import VerifyJWT from '../Middlewares/Auth.middleware.js';
import IsAdmin from '../Middlewares/IsAdmin.middleware.js';
import { createBrand } from '../Controllers/Brand.controller.js';

const brandRouter = router();


brandRouter.route('/create-brand').post(VerifyJWT , IsAdmin , createBrand)



export default brandRouter