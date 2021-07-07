const crypto = require("crypto");
const node_cache = require("node-cache");
const caches = new node_cache();

class OtpCache {


    static async OtpGenerate() {
        "use strict";
        try {
            let TypeinstaceOf=Object.prototype.toString.call(arguments[0]).replace(/(\[||\])+/gi,"").split(" ")[1].toLowerCase();;
            arguments[0]=TypeinstaceOf==="object"?arguments[0]:{};
            let { digits, type_code, time } = arguments[0];
            let bytesAlphaNumeric="Aa0Bb1Cc2Dd3Ee4Ff5Gg6Hh7Ii8Jj9Kk0Ll1Mm2Nn3Oo4Pp5Qq6Rr7Ss8Tt9Uu0Vv1Ww2Xx3Yy4Zz5";
            let SwitchBranch = {
                "numeric": bytesAlphaNumeric.replace(/[A-Za-z]/gi, ""),
                "alphanumeric": bytesAlphaNumeric.toString('hex'),
                "alpha": bytesAlphaNumeric.replace(/[0-9]/gi, ""),
            };
            let SelectSwitch=Math.abs(Math.ceil(Math.random()*Object.keys(SwitchBranch).length-1));
            let DynamicTypeCode=Object.keys(SwitchBranch)[SelectSwitch];
            type_code = type_code || typeof (type_code) === "string" ? Object.keys(SwitchBranch).includes(String(type_code).toLowerCase()) ? String(type_code).toLowerCase() : DynamicTypeCode : DynamicTypeCode;
            digits = digits || typeof (digits) === "number" ? digits >= 6 ? digits : 6 : 6;
            time = time || typeof (time) === "number" ? time : 30;
            let code = "", newCode = "";
            if (SwitchBranch.hasOwnProperty(String(type_code).toLowerCase())) {
                code = SwitchBranch[String(type_code).toLowerCase()];
            }
            do {
                let randomCodes = Math.ceil(Math.random() * code.length - 1, time);
                newCode += code[randomCodes];
                if (newCode.length === digits) {
                    if (!caches.has("otp_caches_" + newCode)) {
                        caches.set("otp_caches_" + newCode, newCode, time);
                    } else {
                        newCode = "";
                    }
                }
            } while (newCode.length < digits);
            return newCode;
        } catch (error) {
            throw new Error(error);
        }
    }

    static async OtpVerify() {
        "use strict";
        try {
            arguments[0] = arguments[0] ? arguments[0] : {};
            let { otp_code = "" } = arguments[0];
            if (otp_code && typeof (otp_code) === "string" && caches.has("otp_caches_" + otp_code)) {
                caches.del("otp_caches_" + String(otp_code));
                return true;
            } else {
                throw new Error(`Invalid otp code ${otp_code}`);
            }
        } catch (error) {
            throw new Error(error);
        }
    }

}

module.exports = OtpCache;
