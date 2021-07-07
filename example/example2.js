const OTP = require("../index");

OTP.OtpGenerate({digits:4}).then(async(OtpToken)=>{
    console.log(OtpToken);
    let OTPStatus=await OTP.OtpVerify({otp_code:OtpToken})
    if(OTPStatus){
        console.log(`OTP Verified`);
    }else{
        console.log(`OTP Unverified`);
    }
});
