import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';


const userSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true, 
    },
    otp: {
      type: String,
      required: false, 
    },
    otpExpiry: {
      type: Date,
      required: false, 
    },
 
    role: {
      type: String,
      enum: ['user', 'admin'], 
      default: 'user',
    },

    name: {
      type: String,
      required: false, // This will be filled in after OTP verification
    },
    address: {
      type: String,
      required: false, // This will be filled in after OTP verification
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set the creation time when a user is added
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Automatically set the update time whenever the user is updated
    },

    refreshToken:{
      type:String
    }

  },
  { timestamps: true } // Mongoose will automatically add createdAt and updatedAt
);




userSchema.methods.generateAccessToken = async function () {
  const user = this;
   return jwt.sign(
    {
     userId:user._id,
     
   },
 
    process.env.ACCESS_TOKEN_SECRET,

    {
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    },

  )
 }


 userSchema.methods.generateRefreshToken = async function () {
  const user = this;

  return jwt.sign(
    {
      userId:user._id
    },
   
    process.env.REFRESH_TOKEN_SECRET,

    {
      expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }

  )
 }


const UserModel = mongoose.model('User', userSchema);

export default UserModel;
