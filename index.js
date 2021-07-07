const { randomBytes } = require("crypto");
const node_cache = require("node-cache");
const caches = new node_cache();

class OtpCache {


    static async OtpGenerate() {
        "use strict";
        try {
            arguments[0] = arguments[0] ? arguments[0] : {};
            let { digits, type_code, time } = arguments[0];
            let bytes = randomBytes(1024 * 2);
            let SwitchBranch = {
                "numeric": bytes.toString('hex').replace(/[A-Za-z]/gi, ""),
                "alphanumeric": bytes.toString('hex'),
                "alpha": bytes.toString('hex').replace(/[0-9]/gi, ""),
            };
            let defaultSwitch = "alphanumeric";
            type_code = type_code || typeof (type_code) === "string" ? Object.keys(SwitchBranch).includes(String(type_code).toLowerCase()) ? String(type_code).toLowerCase() : defaultSwitch : defaultSwitch;
            digits = digits || typeof (digits) === "number" ? digits : 6;
            time = time || typeof (time) === "number" ? time : 60;
            let code = "", newCode = "";
            if (SwitchBranch.hasOwnProperty(String(type_code).toLowerCase())) {
                code = SwitchBranch[String(type_code).toLowerCase()];
            }
            do {
                let randomCodes = Math.floor(Math.random() * code.length - 1, time);
                newCode += code[randomCodes];
                if (newCode.length === digits) {
                    if (!caches.has("otp_caches_" + newCode.toUpperCase())) {
                        caches.set("otp_caches_" + newCode.toUpperCase(), newCode.toUpperCase(), time);
                    } else {
                        newCode = "";
                    }
                }
            } while (newCode.length < digits);
            return newCode.toUpperCase();
        } catch (error) {
            throw new Error(error);
        }
    }

    static async OtpVerify() {
        "use strict";
        try {
            arguments[0] = arguments[0] ? arguments[0] : {};
            let { otp_code = "" } = arguments[0];
            if (otp_code && typeof (otp_code) === "string" && caches.has("otp_caches_" + otp_code.toUpperCase())) {
                caches.del("otp_caches_" + String(otp_code).toUpperCase());
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