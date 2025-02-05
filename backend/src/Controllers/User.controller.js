import UserModel from "../Models/Users.model.js"
import { sendSuccessResponse } from "../Utils/SuccessResponse.utils.js";




const getUser = async (req , res) => {

const user = await UserModel.findById(req.user._id);

if(!user){
  return res.status(404)
  .json({message:'user not found'})
}

return sendSuccessResponse(res, 200 , 'user fetched successfully', 'user' , user)

}




export {
  getUser
}