import jwt from "jsonwebtoken";

const middle = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      if (!token) throw new Error("Access token tidak ditemukan");

      jwt.verify(token, process.env.ACCESS_TOKEN, async (err) => {
        if (err) {
          res.status(401).json({ msg: "Token tidak valid" });
        }
      });
      next();
    } catch (error) {
      return res.status(404).send({ msg: error.message });
    }
  }
};

export default middle;
