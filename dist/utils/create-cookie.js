import { COOKIE_NAME } from "../constants/common.js";
import { createToken } from "./token-manager.js";
export const createCookie = (res, user, req) => {
    res.set("Access-Control-Allow-Origin", req.headers.origin); //req.headers.origin
    res.set("Access-Control-Allow-Credentials", "true");
    // access-control-expose-headers allows JS in the browser to see headers other than the default 7
    res.set("Access-Control-Expose-Headers", "date, etag, access-control-allow-origin, access-control-allow-credentials");
    res.clearCookie(COOKIE_NAME, {
        path: "/",
        httpOnly: true,
        signed: true,
        secure: true,
        sameSite: "none",
    });
    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
        path: "/",
        expires,
        httpOnly: true,
        signed: true,
        secure: true,
        sameSite: "none",
    });
};
//# sourceMappingURL=create-cookie.js.map