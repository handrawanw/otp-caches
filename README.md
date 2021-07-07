# otp-caches

#### npm install
```
npm install otp-caches
```

#### fix audit
```
npm audit fix
```


### How To Use ?

Generate OTP ( Promise )
```
    OtpGenerate({digits:6,type_code:"numeric",time:60}).then((OTP)=>{
        console.log("OTP Code Generated Successfully");
    }).catch((err)=>{
      console.error("Generate OTP : "+err.message);
    });
```

#### OTP GENERATE OPTIONS (object)
| Options | Type data | Default |
| --- | --- | --- |
| digits | int | 6 |
| type_code | string | alphanumeric, numeric or alpha |
| time | int | 60 (60 seconds) |



#### Verify OTP (Promise) -
 ```
    OtpVerify({ otp_code: "ST0DK1" }).then(()=>{
       console.log("OTP Verified");
    }).catch((err)=>{
      console.error("Verify OTP : "+err.message);
    });
```

#### OTP VERIFY OPTIONS (object)
| Options | Type data | Default |
| --- | --- | --- |
| otp_code | string | "" |

#### Enjoy
