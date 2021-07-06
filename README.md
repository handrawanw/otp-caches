# otp-caches

#### npm install
```
npm install otp-cache
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
| Options | Type data | Default |
| --- | --- | --- |
| otp_code | int | "" |

```
    OtpVerify({ otp_code: "ST0DK1" }).then(()=>{
       console.log("OTP Verified");
    }).catch((err)=>{
      console.error("Verify OTP : "+err.message);
    });
```

#### Full example express js

```
const express = require("express");
const app = express();
const PORT = 1999;

const { OtpGenerate, OtpVerify } = require(".");

function generate_otp(req, res, next) {
    OtpGenerate({}).then((OTP)=>{
        res.status(201).json({
            message: `OTP Code Generated Successfully`,
            OTP,
            status: 201,
        });
    }).catch(next);
}

function verifyOtp(req, res, next) {
    const {token}=req.body;
    OtpVerify({ otp_code: token }).then(()=>{
       next();
    }).catch(next);
}

function errHandler(err, req, res, next) {
    let message = err.message;
    console.log(err);
    res.status(500).json({
        message,
        status: 500
    });
}

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/otpgenerate", generate_otp);
app.post("/otpverify",verifyOtp,(req,res,next)=>{
    res.status(200).json({
        message: `OTP Verified`,
        status: 200,
    });
});
app.use(errHandler);

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

```

##### Noted
Never underestimate the determination of a child who is rich in time and poor in money
