import router from 'express'
import { createCategory } from '../Controllers/Category.controller.js';
import VerifyJWT from '../Middlewares/Auth.middleware.js';
import IsAdmin from '../Middlewares/IsAdmin.middleware.js';

const categoryRouter = router();

categoryRouter.route('/create-category').post( VerifyJWT, IsAdmin ,createCategory)



export default categoryRouter