import { COOKIE_NAME } from "../constants/common.js";
import { createToken } from "./token-manager.js";
import { Response } from "express";

export const createCookie = (res: Response, user) => {
  res.clearCookie(COOKIE_NAME, {
    path: "/",
    domain: "localhost", //esto debo modificarlo con mi dominio propio en prod
    httpOnly: true,
    signed: true,
  });
  const token = createToken(user._id.toString(), user.email, "7d");
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);
  res.cookie(COOKIE_NAME, token, {
    path: "/",
    domain: "localhost", //esto debo modificarlo con mi dominio propio en prod
    expires,
    httpOnly: true,
    signed: true,
  });
};
