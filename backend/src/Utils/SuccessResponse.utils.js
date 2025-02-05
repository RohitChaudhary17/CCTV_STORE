// class SuccessResponse {
//   constructor(statusCode, data, message = "Success"){
//       this.statusCode = statusCode
//       this.data = data
//       this.message = message
//       this.success = statusCode < 400
//   }
// }

// export { SuccessResponse }



// successResponse.js





const sendSuccessResponse = (res, statusCode, message = "Success", dataKey = "data", data) => {
  const success = statusCode < 400;  // If statusCode is less than 400, it's a success
  const responseObject = {
    statusCode,
    success,
    message
  };
  
  // Dynamically set the data field
  responseObject[dataKey] = data;

  return res.status(statusCode).json(responseObject);
};

export { sendSuccessResponse };

//sendSuccessResponse(res, 200, "Fetched successfully", "userData", { id: 1, name: "John Doe" });










// const sendSuccessResponse =  (res, statusCode, data , message = "Success" ) => {
//   const success = statusCode < 400;  // If statusCode is less than 400, it's a success
//   return res.status(statusCode).json({
//     statusCode,
//     success,
//     message,
//     data
//   });
// };

// export { sendSuccessResponse };
