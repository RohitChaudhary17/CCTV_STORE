import router from 'express'
import  VerifyJWT  from '../Middlewares/Auth.middleware.js';
import { getUser } from '../Controllers/User.controller.js';
import IsAdmin from '../Middlewares/IsAdmin.middleware.js';

const userRouter = router();

userRouter.route('/me').get(VerifyJWT ,IsAdmin, getUser)


export default userRouter