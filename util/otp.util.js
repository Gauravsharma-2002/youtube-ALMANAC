import crypto from "crypto";
import * as otpAuth from "otpauth"
import pkg from "hi-base32";
const { encode } = pkg;

const generateRandomBase32 = async () => {
  const buffer = crypto.randomBytes(15);
  console.log(buffer);
  const base32 = encode(buffer).replace(/=/g, "").substring(0, 24);
  console.log(base32);
  return base32;
};

const generateOtp = async()=>{
    const base32_secret = generateRandomBase32();
    let totp = new otpAuth.TOTP({
        issuer:""
    })
}