import jwt from "jsonwebtoken";
const authMiddleware = async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken || req?.header?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "You did not log in",
        error: true,
        success: false,
      });
    }
    const decoded = await jwt.verify(
      token,
      process.env.SECRET_KEY_ACCESS_TOKEN
    );
    if (!decoded) {
      return res.status(401).json({
        message: "",
        error: true,
        success: false,
      });
    }
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "",
      error: true,
      success: false,
    });
  }
};
export default authMiddleware;
