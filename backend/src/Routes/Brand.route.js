import router from 'express'
import VerifyJWT from '../Middlewares/Auth.middleware.js';
import IsAdmin from '../Middlewares/IsAdmin.middleware.js';
import { createBrand, deleteBrand, getAllBrand, updateBrand } from '../Controllers/Brand.controller.js';

const brandRouter = router();


// route open for all
brandRouter.route('/get-all-brand').get(getAllBrand)



// admin protected routes
brandRouter.route('/create-brand').post(VerifyJWT , IsAdmin , createBrand)
brandRouter.route('/update-brand').patch(VerifyJWT , IsAdmin , updateBrand)
brandRouter.route('/delete-brand').delete(VerifyJWT , IsAdmin , deleteBrand)



export default brandRouter