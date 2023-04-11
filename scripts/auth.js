import * as jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || 'development';

export function verifyUserSession (req, res, next) {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("token");
    return res.redirect("/login");
  }
};