const OTP = require("../index");

const PASSWORD="no-secret";

OTP.OtpGenerate({digits:6,type_code:"alphanumeric",secret:PASSWORD,payload:{user:"john doe"}}).then(async(OtpToken)=>{
    let OTPStatus=await OTP.OtpVerify({otp_code:OtpToken,secret:PASSWORD})
    if(OTPStatus){
        console.log(`OTP Verified`,OTPStatus);
    }else{
        console.log(`OTP Unverified`);
    }
}).catch((err)=>{
    console.error(err.message);
});
