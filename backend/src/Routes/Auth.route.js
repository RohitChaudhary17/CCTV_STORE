import router from 'express';
import { LogOutUser, otpLogin, verifyOtp } from '../Controllers/Auth.controller.js';
import  VerifyJWT  from '../Middlewares/Auth.middleware.js';
import IsAdmin from '../Middlewares/IsAdmin.middleware.js';

const authRouter = router();


authRouter.route('/login').post(otpLogin);
authRouter.route('/verify-otp',).post( verifyOtp);
authRouter.route('/logout').get(VerifyJWT ,LogOutUser);

export default authRouter;
