import jwt from 'jsonwebtoken';  
import crypto from 'crypto';
import { sendOtp } from '../Utils/Twilio.utils.js';
import UserModel from '../Models/Users.model.js';


const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString();
};


const options ={
  httpOnly:true,
  secure:true,
}



const otpLogin = async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ message: 'Phone number is required' });
  }

  try {
    const otp = generateOtp(); 
    const otpExpiry = Date.now() + 5 * 60 * 1000; // OTP expires in 5 minutes

    
    let user = await UserModel.findOne({ phoneNumber });

    if (!user) {
      
      user = new UserModel({ phoneNumber, otp, otpExpiry });
      await user.save();
    } else {
      
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      await user.save();
    }

    
    await sendOtp(phoneNumber, otp);

    res.status(200).json({ message: 'OTP sent successfully', phoneNumber });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};




const verifyOtp = async (req, res) => {
  const { phoneNumber, otp } = req.body;

  if (!phoneNumber || !otp) {
    return res.status(400).json({ message: 'Phone number and OTP are required' });
  }

  try {
    
    const user = await UserModel.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    const accessToken  =  await user.generateAccessToken()
    const refreshToken  = await user.generateRefreshToken()
    user.refreshToken = refreshToken;
    console.log(accessToken, refreshToken)

    user.otp = null;
    user.otpExpiry = null;
    await user.save();
 
    res.status(200)
    .cookie("accessToken", accessToken , options)
    // .cookie("refreshToken", refreshToken, options)
    .json({ message: 'OTP verified successfully', accessToken, user });

  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



const LogOutUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      req.user._id,
      {
        $unset: { refreshToken: "" }, // This will remove the field entirely from the database
      },
      {
        new: true,
      }
    );

    console.log(user.refreshToken); 

    if (user.refreshToken) {
      return res.status(404).json('Failed to delete refresh token');
    }

    return res.status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({ message: 'Success logout' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};






export{
otpLogin,
verifyOtp,
LogOutUser,
}
