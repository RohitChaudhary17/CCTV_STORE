import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";





const app = express();
app.use(cors());
app.use(express.json({limit:'16kb'}));
app.use(express.urlencoded({extended: true , limit:'16kb'}));
app.use(express.static("public")); 
app.use(cookieParser());
app.use(morgan('dev'))




import authRouter from "./Routes/Auth.route.js";
import userRouter from "./Routes/User.route.js";
import brandRouter from "./Routes/Brand.route.js";
import categoryRouter from "./Routes/Category.route.js";
import productRouter from "./Routes/Product.route.js";


app.use('/api/v1/auth/' , authRouter)
app.use('/api/v1/user/' ,userRouter)
app.use('/api/v1/category' , categoryRouter)
app.use('/api/v1/brand' , brandRouter)
app.use('/api/v1/products' , productRouter)





export {app}