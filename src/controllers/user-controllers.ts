import { NextFunction, Response, Request } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createCookie } from "../utils/create-cookie.js";
import { COOKIE_NAME } from "../constants/common.js";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //aqui tenemos todos los usuarios
  try {
    const users = await User.find();

    //response
    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.log(error);

    //response
    return res.status(400).json({ message: "Error", cause: error.message });
  }
};

export const userSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, dni, parents, isForeign, password } = req.body;

    //verify if user exists
    const existingUser = await User.findOne({ dni });
    if (existingUser) {
      return res.status(401).send("User alredy registered");
    }

    const hashedPassword = await hash(password, 10);
    const user = new User({
      name,
      email,
      dni,
      dniImage: "DATOQUEMADO",
      parents: "DATOQUEMADO",
      credits: "DATOQUEMADO",
      healthCertificate: "DATOQUEMADO",
      isForeign: false,
      migratoryPermit: "DATOQUEMADO",
      password: hashedPassword,
      isEnrolled: false,
      enrollNumber: null,
    });
    await user.save();

    //create cookie
    createCookie(res, user, req);

    //reponse
    return res.status(200).json({
      message: "Welcome",
      id: user.id,
      name: user.name,
      email: user.email,
      dni: user.dni,
      isEnrolled: user.isEnrolled ?? false,
    });
  } catch (error) {
    console.log(error);
    //response
    return res.status(400).json({ message: "Error", cause: error.message });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { dni, password }: { dni: string; password: string } = req.body;
    const user = await User.findOne({ dni });
    if (!user) return res.status(401).send("User not found");

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) return res.status(403).send("Incorrect password");

    //create cookie
    createCookie(res, user, req);

    return res.status(200).json({
      message: "Welcome",
      id: user.id,
      name: user.name,
      email: user.email,
      dni: user.dni,
      isEnrolled: user.isEnrolled ?? false,
      enrollNumber: user.enrollNumber ?? null,
    });
  } catch (error) {
    console.log(error);

    //response
    return res.status(400).json({ message: "Error", cause: error.message });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //check if token is valid
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res.status(401).send("User not found or Token malfuntioned");
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permission denied");
    }
    return res.status(200).json({
      message: "Welcome",
      id: user.id,
      name: user.name,
      email: user.email,
      dni: user.dni,
      isEnrolled: user.isEnrolled ?? false,
      enrollNumber: user.enrollNumber ?? null,
    });
  } catch (error) {
    console.log(error);

    //response
    return res.status(400).json({ message: "Error", cause: error.message });
  }
};

export const userLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //check if token is valid
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res.status(401).send("User not found or Token malfuntioned");
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permission denied");
    }

    res.clearCookie(COOKIE_NAME, {
      path: "/",
      httpOnly: true,
      signed: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({ message: "Bye 👋" });
  } catch (error) {
    console.log(error);

    //response
    return res.status(400).json({ message: "Error", cause: error.message });
  }
};
