import router from 'express'
import { createCategory, deletecategory, getAllCategory, updateCategory } from '../Controllers/Category.controller.js';
import VerifyJWT from '../Middlewares/Auth.middleware.js';
import IsAdmin from '../Middlewares/IsAdmin.middleware.js';

const categoryRouter = router();


// route open for all
categoryRouter.route('/get-all-category').get(getAllCategory)




// admin protected routes
categoryRouter.route('/create-category').post( VerifyJWT, IsAdmin ,createCategory)
categoryRouter.route('/update-category').patch( VerifyJWT, IsAdmin ,updateCategory)
categoryRouter.route('/delete-category').delete( VerifyJWT, IsAdmin ,deletecategory)



export default categoryRouter