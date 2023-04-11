import * as jwt from "jsonwebtoken";

export function verifyUserSession(req, res, next) {
  const token = req.cookies.token;
  try {
    const user = jwt.default.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("token");
    return res.redirect("/login");
  }
};