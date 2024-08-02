// // import express from "express"
// // import nodemailer from "nodemailer";
// // import { PrismaClient } from "@prisma/client";
// // import cors from "cors";
// // import morgan from "morgan";

// // import crypto from "crypto";
// // import { Prisma } from "@prisma/client";
// // import * as otpAuth from "otpauth";
// // import pkg from "hi-base32";

// // // export const Prisma = new PrismaClient();
// // const app = express();
// // const { encode } = pkg;
// // export const prima = new PrismaClient();

// // async function main() {
// //   app.use(morgan("dev"));
// //   app.use(express.json());
// //   app.use(
// //     cors({
// //       origin: ["http://localhost:8000"],
// //       credentials:true
// //     })
// //   );

// //   const registerUser = async (req, res) => {
// //     try {
// //       const { name, email, password } = req.body;
// //       console.log(name, email, password);
// //       await prima.user.create({
// //         data: {
// //           name,
// //           email,
// //           password: crypto.createHash("sha256").update(password).digest("hex"),
// //         },
// //       });
// //       res
// //         .status(200)
// //         .json({ message: "ye bkl ho gaya register", status: "success" });
// //     } catch (error) {
// //       if (error instanceof Prisma.PrismaClientKnownRequestError) {
// //         if (error.code === "p2002") {
// //           return res.status(402).json({
// //             message: " user already register ",
// //             status: " fail",
// //           });
// //         }
// //       }
// //       res.status(402).json({ message: error.message, status: "failed" });
// //     }
// //   };
// //   app.get("/healthcheck", (req, res) => {
// //     res.status(200).json({
// //       message: "things good",
// //       status: "sucess",
// //     });
// //   });

// //   // register route
// //   app.post("/auth/register", registerUser);

// //   app.listen(8000, () => {
// //     console.log("things good at port : 8000");
// //   });
// // }

// // main()
// //   .then(async () => {
// //     await prima.$disconnect();
// //   })
// //   .catch(async (e) => {
// //     console.error(e);
// //     await prima.$disconnect();
// //     process.exit(1);
// //   });
// // // async function main() {
// // //   app.use(morgan("dev"));
// // //   app.use(
// // //     cors({
// // //       origin: ["http://localhost:3000"],
// // //       credentials: true,
// // //     })
// // //   );

// // //   app.use(Express.json());
// // //   app.get("/gethealthcheck", (req, res) => {
// // //     res.status(200).json({
// // //       message: "things are good here",
// // //       status: 201,
// // //     });
// // //   });

// // //   app.all("*", (req, res) => {
// // //     return res.status(404).json({
// // //       status: "fail",
// // //       message: `Route: ${req.originalUrl} not found`,
// // //     });
// // //   });

// // //   app.listen(8000, () => {
// // //     console.log(`server at 8000`);
// // //   });
// // // }

// // // main()
// // //   .then(async () => {
// // //     await Prisma.$disconnect();
// // //   })
// // //   .catch(async (e) => {
// // //     console.error(e);
// // //     await Prisma.$disconnect();
// // //     process.exit(1);
// // //   });

// // // const transporter = nodemailer.createTransport({
// // //   service: "gmail",
// // //   auth: {
// // //     user: "gauravmaharaj1234@gmail.com",
// // //     pass: "aajiatmibwkndwxl",
// // //   },
// // // });
// // // const mailOption = {
// // //   from: "gauravmaharaj1234@gmail.com",
// // //   to: "2140113@sliet.ac.in",
// // //   subject: ">>🙂 😎🫡😀 ye le ye le",
// // //   text: "aur kya lega ye le ye le ye ele aj omlet ni banauga aj tahalka omlete banaunga , ye le ye le ye le",
// // // };

// // // app.get("/", async (req, res) => {
// // //   //   let response = null;
// // //   const revertedData = await transporter.sendMail(mailOption, (error, info) => {
// // //     if (error) {
// // //       console.error(error.message);
// // //     } else {
// // //     //   response = info;
// // //       console.log(info.response);
// // //     }
// // //   });
// // //   res.json({revertedData});
// // // });
// // // app.get("/otpCheck", async (req, res) => {});

// // // app.listen(3000, () => {
// // //   console.log(`server woking at 3000`);
// // // });

// import express, { urlencoded } from "express";
// import cors from "cors";
// import morgan from "morgan";
// import { json } from "stream/consumers";
// import { PrismaClient } from "@prisma/client";

// const app = express();
// export const prisma = new PrismaClient();
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json({}));
// app.use(
//   cors({
//     origin: ["http://localhost:8000"],
//     credentials: true,
//   })
// );
// app.use(morgan("dev"));

// // routes
// import { userRouter } from "./routes/user.route.js";
// app.use("/auth", userRouter);

// app.listen(8000, () => {
//   console.log("thing are fine at port : 8000");
// });
