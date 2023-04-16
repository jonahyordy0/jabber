import * as jwt from "jsonwebtoken";

export function verifyUserSession(req, res, next) {
  const token = req.cookies.token;

  if (req.route.path !== "/login" && req.route.path !== "/register") {
    try {
      const user = jwt.default.verify(token, process.env.JWT_SECRET);
      req.user = user;
      next();
    } catch (err) {
      res.clearCookie("token");
      return res.redirect("/login");
    }
  } else {
    try {
      jwt.default.verify(token, process.env.JWT_SECRET);
      return res.redirect("/dashboard/home");
    } catch (err) {
      next();
    }
  }
};
