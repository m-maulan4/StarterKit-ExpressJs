import { userModel } from "../user/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createHash } from "crypto";

export const authRegis = async (req, res) => {
  const { fullname, username, password } = req.body;
  if (!fullname || !username || !password) {
    return res
      .status(400)
      .send({ msg: "Harap Full Name, Username, dan Password diisi" });
  }
  const checkUsername = await userModel.findOne({ username });
  if (checkUsername) {
    return res.status(400).send({ msg: "Username sudah digunakan" });
  }
  try {
    await userModel.create({ fullname, username, password });
    res.send({ msg: "Berhasil ditambahkan" });
  } catch (error) {
    res.status(400).send({ msg: "Error" });
  }
};
export const authLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      throw new Error("Username dan Password tidak valid");

    const user = await userModel.findOne({ where: { username } });
    if (!user) throw new Error("Username tidak terdaftar");

    const passCompare = await bcrypt.compare(password, user.password);
    if (!passCompare) throw new Error("password salah");

    const payload = { id: user.id, username: user.username };
    const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN, {
      expiresIn: "7d",
    });
    const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN, {
      expiresIn: "15m",
    });
    res
      .cookie("refresh_token", refresh_token, {
        httpOnly: true,
        secure: false, // set true jika pakai https
        path: "/",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ username, token: access_token, token_type: "Bearer" });
  } catch (error) {
    return res.status(401).json(error.message);
  }
};
export const authLogout = async (req, res) => {
  res.clearCookie("refresh_token").json({ msg: "success" });
};
export const me = async (req, res) => {
  const refresh_token = req.cookies.refresh_token;

  if (!refresh_token)
    return res.status(401).json({ msg: "Login terlebih dahulu" });
  jwt.verify(refresh_token, process.env.REFRESH_TOKEN, async (err, user) => {
    if (err) return res.status(401).json({ msg: "Login terlebih dahulu" });
    const access_token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "15m",
      }
    );
    return res.json({
      username: user.username,
      token: access_token,
      token_type: "Bearer",
    });
  });
};
