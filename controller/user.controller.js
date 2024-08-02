import crypto from "crypto";
import { Prisma } from "@prisma/client";
import { prisma } from "../index.js";
import * as otpAuth from "otpauth";
// import { encode } from "hi-base32";
import pkg from "hi-base32";

const { encode } = pkg;
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    await prisma.user.create({
      data: {
        name,
        email,
        password: crypto.createHash("sha256").update(password).digest("hex"),
      },
    });

    res.status(200).json({ message: "things good here", status: "success" });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "p2002") {
        return res.status(409).json({
          status: "fail",
          message: "email already exists",
        });
      }
    }
    res.status(402).json({
      message: error.message,
      status: "fail",
    });
  }
};
export { registerController };
