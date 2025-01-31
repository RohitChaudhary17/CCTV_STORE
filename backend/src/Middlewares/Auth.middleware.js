// import jwt from "jsonwebtoken";
// import UserModel from "../Models/Users.model.js";

// export const VerifyJWT = async (req, res , next)=> {

//  try {
//   // extract the token from the request body and parse it into an object
//   const token = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer ", "");

//   // check if the token is present in the request
//   if(!token){
//    return res.status(403).json({message:'Token missing'})
//   }
 
//   // verify the token using the secret key
//   const decodedToken =  jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);
 
//   // find the user in the database based on the user id in the decoded token
//   const user =  await UserModel.findById(decodedToken?._id)
 
//   // check if the user exists in the database
//   if(!user){
//    return res.status(403).json({message:'Invalid token'})
//   }
 
//   // if the user exists, add it to the request object and call the next middleware function
//   req.user = user;
//   next()

  
//  } catch (error) {
//   console.error(error);
//   res.status(500).json({message:'Server error'})
//  }

// }




// second last

// const jwt = require('jsonwebtoken');
// const { getRefreshTokenFromDB } = require('./db'); // Database function to get refresh token by userId
// const { SECRET_ACCESS_TOKEN, SECRET_REFRESH_TOKEN } = process.env; // JWT secrets

// // Middleware to protect routes and refresh access token when expired
// const authMiddleware = async (req, res, next) => {
//     // Get the access token from the cookies (assuming it's stored in HTTP-only cookies)
//     const accessToken = req.cookies.access_token;

//     // If there's no access token, reject the request
//     if (!accessToken) {
//         return res.status(401).json({ message: 'Access token is missing. Please login.' });
//     }

//     try {
//         // 1. Decode the access token (this doesn't verify the token, just decodes it)
//         const decodedAccessToken = jwt.decode(accessToken);

//         // 2. If token is not decoded properly (i.e., invalid token), reject it
//         if (!decodedAccessToken) {
//             return res.status(401).json({ message: 'Invalid access token.' });
//         }

//         // 3. Verify the access token using the secret key
//         const verifiedAccessToken = jwt.verify(accessToken, SECRET_ACCESS_TOKEN);
        
//         // 4. If the access token is valid, set the userId and proceed to the next middleware
//         req.userId = verifiedAccessToken.userId;
//         return next(); // Token is valid, proceed

//     } catch (err) {
//         // If access token is invalid or expired, handle expiration and refresh logic

//         // Decode the token again to get userId (we do this safely as we already caught invalid token errors)
//         const decodedAccessToken = jwt.decode(req.cookies.access_token);
//         const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
//         const isAccessTokenExpired = decodedAccessToken && decodedAccessToken.exp < currentTime;

//         // If the access token is expired, attempt to refresh it using the refresh token
//         if (isAccessTokenExpired) {
//             const userIdFromAccessToken = decodedAccessToken.userId;

//             // Query the database to get the stored refresh token for the user
//             const storedRefreshToken = await getRefreshTokenFromDB(userIdFromAccessToken);

//             if (!storedRefreshToken) {
//                 return res.status(401).json({ message: 'No refresh token found. Please login again.' });
//             }

//             // Verify the refresh token
//             const decodedRefreshToken = jwt.verify(storedRefreshToken, SECRET_REFRESH_TOKEN);

//             // Ensure the refresh token belongs to the same user
//             if (decodedRefreshToken.userId !== userIdFromAccessToken) {
//                 return res.status(401).json({ message: 'Refresh token does not belong to the current user.' });
//             }

//             // Generate a new access token
//             const newAccessToken = jwt.sign(
//                 { userId: userIdFromAccessToken },
//                 SECRET_ACCESS_TOKEN,
//                 { expiresIn: '15m' } // Access token expires in 15 minutes
//             );

//             // Send the new access token to the client (set as HTTP-only cookie)
//             res.cookie('access_token', newAccessToken, { httpOnly: true, secure: true }); // Ensure HTTPS in production

//             // Attach userId to the request object for downstream usage
//             req.userId = userIdFromAccessToken;

//             return next();
//         }

//         // If the access token is not expired but invalid, reject it
//         return res.status(401).json({ message: 'Access token is expired or invalid. Please login again.' });
//     }
// };

// module.exports = authMiddleware;



// last
// import jwt from "jsonwebtoken";
// import UserModel from "../Models/Users.model.js";

// // Middleware to protect routes and refresh access token when expired
// const VerifyJWT = async (req, res, next) => {
//     // Get the access token from the cookies (assuming it's stored in HTTP-only cookies)
//     const accessToken = req.cookies.access_token;

//     // If there's no access token, reject the request
//     if (!accessToken) {
//         return res.status(401).json({ message: 'Access token is missing. Please login.' });
//     }

//     try {
//         // 1. Decode the access token (this doesn't verify the token, just decodes it)
//         const decodedAccessToken = jwt.decode(accessToken);

//         // 2. If token is not decoded properly (i.e., invalid token), reject it
//         if (!decodedAccessToken) {
//             return res.status(401).json({ message: 'Invalid access token.' });
//         }

//         // 3. Verify the access token using the secret key
//         const verifiedAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

//         const user =  await UserModel.findById(verifiedAccessToken?._id)

//         if(!user){
//              return res.status(403).json({message:'Invalid token'})
//              }
        
//         // 4. If the access token is valid, set the userId and proceed to the next middleware
//         req.user = user;
//         return next(); // Token is valid, proceed

//     } catch (err) {
//         // If access token is invalid or expired, handle expiration and refresh logic

//         // Decode the token again to get userId (we do this safely as we already caught invalid token errors)
//         const decodedAccessToken = jwt.decode(req.cookies.access_token);
//         const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
//         const isAccessTokenExpired = decodedAccessToken && decodedAccessToken.exp < currentTime;

//         // If the access token is expired, attempt to refresh it using the refresh token
//         if (isAccessTokenExpired) {
//             const userIdFromAccessToken = decodedAccessToken.userId;

//             // Query the database to get the stored refresh token for the user
//             const user = await UserModel.findById(decodedAccessToken.userId);

//             if (!user.refreshToken) {
//                 return res.status(401).json({ message: 'No refresh token found. Please login again.' });
//             }

//             // Verify the refresh token
//             const decodedRefreshToken = jwt.verify(user.refreshToken, SECRET_REFRESH_TOKEN);

//             // Ensure the refresh token belongs to the same user
//             if (decodedRefreshToken.userId !== decodedAccessToken.userId) {
//                 return res.status(401).json({ message: 'Refresh token does not belong to the current user.' });
//             }

//             // Generate a new access token
//             const newAccessToken = jwt.sign(
//                 { userId: decodedAccessToken.userId },
//                 SECRET_ACCESS_TOKEN,
//                 { expiresIn: '15m' } // Access token expires in 15 minutes
//             );

//             // Send the new access token to the client (set as HTTP-only cookie)
//             res.cookie('access_token', newAccessToken, { httpOnly: true, secure: true }); // Ensure HTTPS in production

//             // Attach userId to the request object for downstream usage
//             req.userId = decodedAccessToken.userId;

//             return next();
//         }

//         // If the access token is not expired but invalid, reject it
//         return res.status(401).json({ message: 'Access token is expired or invalid. Please login again.' });
//     }
// };

// export default VerifyJWT;





import jwt from 'jsonwebtoken';
import UserModel from '../Models/Users.model.js';


// Middleware to protect routes and refresh access token when expired
const VerifyJWT = async (req, res, next) => {
    // Get the access token from the cookies (assuming it's stored in HTTP-only cookies)
    const accessToken = req.cookies.accessToken;

    // If there's no access token, reject the request
    if (!accessToken) {
        return res.status(401).json({ message: 'Access token is missing. Please login.' });
    }

    try {
        // 1. Verify the access token using the secret key
        const decodedAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        // 2. Check if the user exists with the userId from the token
        const user = await UserModel.findById(decodedAccessToken.userId);
        if (!user) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        // 3. If the access token is valid, set the userId and proceed to the next middleware
        req.user = user;
        return next(); // Token is valid, proceed

    } catch (err) {
        // If access token is invalid or expired, handle expiration and refresh logic
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        const decodedAccessToken = jwt.decode(accessToken); // Decode to check expiry
        const isAccessTokenExpired = decodedAccessToken && decodedAccessToken.exp < currentTime;

        if (isAccessTokenExpired) {
            const userIdFromAccessToken = decodedAccessToken.userId;

            // Query the database to get the stored refresh token for the user
            const user = await UserModel.findById(userIdFromAccessToken);
            if (!user || !user.refreshToken) {
                return res.status(401).json({ message: 'No refresh token found. Please login again.' });
            }

            try {
                // Verify the refresh token
                const decodedRefreshToken = jwt.verify(user.refreshToken, process.env.REFRESH_TOKEN_SECRET);

                // Ensure the refresh token belongs to the same user
                if (decodedRefreshToken.userId !== userIdFromAccessToken) {
                    return res.status(401).json({ message: 'Refresh token does not belong to the current user.' });
                }

                // Generate a new access token and refresh token using model methods
                const newAccessToken = await user.generateAccessToken();
                const newRefreshToken = await user.generateRefreshToken();

                // Save the new refresh token in the database
                user.refreshToken = newRefreshToken;
                await user.save(); // Save the user with the new refresh token

                // Send the new access token and refresh token to the client (set as HTTP-only cookies)
                res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: true }); // Ensure HTTPS in production
                res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true }); // Refresh token as HTTP-only cookie

                // Attach the user to the request object for downstream usage
                req.user = user;

                return next(); // Continue to next middleware

            } catch (refreshErr) {
                return res.status(401).json({ message: 'Invalid refresh token. Please login again.' });
            }
        }

        // If the access token is expired but still valid, handle token verification failure
        return res.status(401).json({ message: 'Access token is expired or invalid. Please login again.' });
    }
};

export default VerifyJWT;
