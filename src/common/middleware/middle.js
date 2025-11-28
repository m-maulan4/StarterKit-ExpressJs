import jwt from "jsonwebtoken";
import loggin from "../helper/loggin.js";

const middle = async (req, res, next) => {
  loggin(req);
  try {
    const accessToken = req.cookies.access_token;
    if (!accessToken) throw new Error("Access token tidak ditemukan");

    jwt.verify(accessToken, process.env.ACCESS_TOKEN, async (err) => {
      if (err) {
        res.status(401).json({ msg: "Token tidak valid" });
      }
    });
    next();
  } catch (error) {
    return res.status(404).send({ msg: error.message });
  }
};

export default middle;
