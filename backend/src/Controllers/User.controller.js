import UserModel from "../Models/Users.model.js"




const getUser = async (req , res) => {

// const {user} = req.body

const user = await UserModel.findById(req.user._id);

if(!user){
  return res.status(404)
  .json({message:'user not found'})
}

return res.status(201).json({user})

}

export {
  getUser
}