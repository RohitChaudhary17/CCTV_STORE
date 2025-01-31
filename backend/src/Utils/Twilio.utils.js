import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhoneNumber = process.env.TWILIO_PHONE_NUMBER ;

const client = twilio(accountSid, authToken);

export const sendOtp = (toPhoneNumber, otp) => {
  return client.messages.create({
    body: `Your OTP is ${otp}`,
    from: fromPhoneNumber,
    to: toPhoneNumber,
  });
};
