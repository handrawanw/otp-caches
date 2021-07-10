# otp-cache

### npm install
```
npm install otp-cache
```


### example
```
npm run otp_example1
npm run otp_example2
```


### How To Use ?

Generate OTP ( Promise )
```
 // example promise
  const {OtpGenerate}=require("otp-cache");
    OtpGenerate({digits:6,type_code:"numeric",time:60,secret:"no-secret",payload:{"user":"john doe"}).then((OTP)=>{
        console.log("OTP Code Generated Successfully ",OTP);
    }).catch((err)=>{
      console.error("Generate OTP : "+err.message);
    });

  // example async await
  (async()=>{
    const {OtpGenerate}=require("otp-cache");
    try {
        let OTP=await OtpGenerate({});
        console.log(OTP);
    } catch (error) {
        console.error("Generate OTP : ",error);
    }
})();
```

### Noted 
If you want to include a payload, you must include a secret key to ensure the security of your payload.
#### OTP GENERATE OPTIONS (object)
| Options | Type data | Default |
| --- | --- | --- |
| digits | int | 4 |
| type_code | string | dynamic -> alphanumeric, numeric or alpha  |
| time | int | 30 seconds |
| secret | string | undefined |
| payload | object,string,number | recommended object form |


#### Verify OTP (Promise) -
 ```
  // example promise
    const {OtpVerify}=require("otp-cache");
    OtpVerify({ otp_code: "ST0DK1",secret:"no-secret" }).then(()=>{
       console.log("OTP Verified");
    }).catch((err)=>{
      console.error("Verify OTP : "+err.message);
    });

  // example async await
  (async()=>{
    const {OtpVerify}=require("otp-cache");
    try {
         let OTP=OtpVerify({ otp_code: "ST0DK1" });
      if(OTP){
        console.log("OTP Verified");
      }
    } catch (error) {
        console.error("Verify OTP : ",error);
    }
 })();
  
```
### Notes
The Secret Key is used to decrypt the payload you include.
#### OTP VERIFY OPTIONS (object)
| Options | Type data | Default |
| --- | --- | --- |
| otp_code | string | "" |
| secret | string | your secret key |
